'use client';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Box, Divider, Grid, Stack } from '@mui/material';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useModal } from '@/providers/ModalProvider';
import { useSnackbar } from '@/providers/SnackBarProvider';
import { DetalleRifa, Producto, Rifa, Ticket } from '@prisma/client';
import { Bold, H1Bold } from '@/app/componentes/Letras';
import { BoxPaper, ButtonFilled, ButtonSimple, InputBox } from '@/app/componentes/Cajas';
import { parseNumber, parsePhone } from '@/app/utils/filtros';
import { purple } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import Image from 'next/image';
interface Props {
    open: boolean;
    setOpen: any;
    max: number;
    min: number;
}
export default function ModalParticipantes({ setOpen, open, max, min }: Props) {
    const { openModal } = useModal();
    const { openSnackbar } = useSnackbar();
    const [Podio, setPodio] = useState({ nro: 0, open: false });
    const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm<Ticket>({
        defaultValues: {
            codigo: 0

        }
    });

    const onSubmit = (Rifa: Rifa & { DetalleRifa: (DetalleRifa & { Producto: Producto })[] }) => {
        openModal({
            titulo: '¿Continuar?',
            content: 'Se agregará nueva rifa',
            callback() {
                axios.post('/api/rifa/crear', Rifa).then(res => {
                    openSnackbar(res.data.mensaje);
                    if (!res.data.error) {
                        setOpen(false);
                    }
                });
                return true;
            }
        });
    }
    return (
        <>
            <Dialog
                open={open}
                keepMounted={false}
                maxWidth='md'
                fullWidth
                PaperProps={{ sx: { borderRadius: 4, background: purple[900], backgroundImage: 'none' } }}
                onClose={() => { setOpen(false) }}
            >
                <Box p={2} component='form' onSubmit={handleSubmit((data) => {

                })}>
                    <H1Bold sx={{ fontSize: 22 }} mb={2}>
                        Crear Rifa
                    </H1Bold>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <H1Bold sx={{ fontSize: 20, mb: 2 }}>Datos de la rifa</H1Bold>

                        </Grid>
                        <Grid item xs={12}>
                            <ButtonFilled
                                sx={{ float: 'right' }} type='submit'>
                                Guardar cambios
                            </ButtonFilled>
                        </Grid>
                    </Grid>
                </Box>
            </Dialog >

        </>
    );
}