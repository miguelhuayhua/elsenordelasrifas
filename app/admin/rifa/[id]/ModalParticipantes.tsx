'use client';
import Dialog from '@mui/material/Dialog';
import { Box, Grid } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useModal } from '@/providers/ModalProvider';
import { useSnackbar } from '@/providers/SnackBarProvider';
import { Ticket } from '@prisma/client';
import { H1Bold, Normal } from '@/app/componentes/Letras';
import { ButtonFilled, InputBox } from '@/app/componentes/Cajas';
import { QRCode } from 'react-qrcode-logo';
import { useEffect } from 'react';
import axios from 'axios';
interface Props {
    open: boolean;
    setOpen: any;
    codigoempiezo: number;
    rifaId: string;
}
export default function ModalParticipantes({ setOpen, open, codigoempiezo, rifaId }: Props) {
    const { openModal } = useModal();
    const { openSnackbar } = useSnackbar();
    const { control, handleSubmit, reset, watch } = useForm<Ticket>({ defaultValues: { codigo: 0, nombre: '' } });
    useEffect(() => {
        axios.post('/api/ticket/obtenercodigoxid', { rifaId }).then(res => {
            reset({ codigo: res.data.codigo || codigoempiezo, nombre: '', rifaId });
        })
    }, []);
    return (
        <>
            <Dialog
                open={open}
                keepMounted={false}
                maxWidth='md'
                fullWidth
                onClose={() => { setOpen(false) }}
            >
                <Box p={2} component='form' onSubmit={handleSubmit((data) => {

                    openModal({
                        titulo: '¿Continuar?',
                        content: 'Se agregará un nuevo ticket',
                        callback() {
                            axios.post('/api/ticket/crear', data).then(res => {
                                openSnackbar(res.data.mensaje);
                                if (!res.data.error) {
                                    setOpen(false);
                                }
                            });
                            return true;
                        }
                    });
                })}>
                    <H1Bold sx={{ fontSize: 22 }} mb={2}>
                        Añadir ticket
                    </H1Bold>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <QRCode style={{ borderRadius: 16, width: "80%", height: "80%", margin: '0 auto', display: 'block' }} value={`${window.location.hostname + ':' + window.location.port}/ticket/${watch('codigo')}`} />
                            <Normal mt={2}>Código: {watch('codigo')}</Normal>
                            <Normal>A nombre de: {watch('nombre') || 'Anónimo'}</Normal>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <H1Bold sx={{ fontSize: 20, mb: 2 }}>Datos de la rifa</H1Bold>
                            <Controller
                                name={"codigo"}
                                control={control}
                                render={({ field: { ref, ...field } }) => (
                                    <InputBox
                                        {...field}
                                        inputRef={ref}
                                        label='Código empiezo'
                                        disabled
                                    />
                                )}
                            />
                            <Controller
                                name={"nombre"}
                                control={control}
                                render={({ field: { ref, ...field } }) => (
                                    <InputBox
                                        {...field}
                                        inputRef={ref}
                                        label='Referencia'
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <ButtonFilled
                                sx={{ float: 'right' }} type='submit'>
                                Registrar
                            </ButtonFilled>
                        </Grid>
                    </Grid>
                </Box>
            </Dialog >

        </>
    );
}