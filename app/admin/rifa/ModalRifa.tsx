'use client';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Box, Divider, Grid, Stack } from '@mui/material';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useModal } from '@/providers/ModalProvider';
import { useSnackbar } from '@/providers/SnackBarProvider';
import { DetalleRifa, Producto, Rifa } from '@prisma/client';
import { Bold, H1Bold } from '@/app/componentes/Letras';
import { BoxPaper, ButtonFilled, ButtonSimple, InputBox } from '@/app/componentes/Cajas';
import { parseNumber, parsePhone } from '@/app/utils/filtros';
import { purple } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ModalProductoRifa from './ProductoRifa';
import { useRouter } from 'next/navigation';
interface Props {
    open: boolean;
    setOpen: any;
}
export default function ModalRifa({ setOpen, open }: Props) {
    const router = useRouter();
    const { openModal } = useModal();
    const { openSnackbar } = useSnackbar();
    const [Podio, setPodio] = useState({ nro: 0, open: false });
    const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm<Rifa & { DetalleRifa: (DetalleRifa & { Producto: Producto })[] }>({
        defaultValues: {
            codigoempiezo: 0,
            monto: 0,
            ganador: '',
            DetalleRifa: []
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
                        router.refresh();
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
                onClose={() => { setOpen(false) }}
            >
                <Box p={2} component='form' onSubmit={handleSubmit(onSubmit)}>
                    <H1Bold sx={{ fontSize: 22 }} mb={2}>
                        Crear Rifa
                    </H1Bold>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <H1Bold sx={{ fontSize: 20, mb: 2 }}>Datos de la rifa</H1Bold>
                            <Controller
                                name={"codigoempiezo"}
                                control={control}
                                rules={{ required: 'Código mínimo obligatorio' }}
                                render={({ field: { ref, ...field } }) => (
                                    <InputBox
                                        {...field}
                                        inputRef={ref}
                                        label='Código empiezo'
                                        helperText={errors.codigoempiezo?.message}
                                        error={!!errors.codigoempiezo}
                                        onChange={ev => field.onChange(parsePhone(ev.target.value))}
                                    />
                                )}
                            />

                            <Controller
                                name={"monto"}
                                control={control}
                                rules={{ required: 'Introduzca el monto de entrada' }}
                                render={({ field: { ref, ...field } }) => (
                                    <InputBox
                                        {...field}
                                        inputRef={ref}
                                        label='Participa con'
                                        helperText={errors.monto?.message}
                                        InputProps={{ endAdornment: 'BOB' }}
                                        error={!!errors.monto}
                                        onChange={ev => field.onChange(parseNumber(ev.target.value))}
                                    />
                                )}
                            />
                            <Controller
                                name={"participantes"}
                                control={control}
                                rules={{ required: 'Introduzca participantes requeridos' }}
                                render={({ field: { ref, ...field } }) => (
                                    <InputBox
                                        {...field}
                                        inputRef={ref}
                                        label='Participantes esperados'
                                        helperText={errors.monto?.message}
                                        InputProps={{ endAdornment: 'BOB' }}
                                        error={!!errors.monto}
                                        onChange={ev => field.onChange(parsePhone(ev.target.value))}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <BoxPaper sx={{ background: 'none' }} p={2}>
                                <H1Bold sx={{ fontSize: 20, mb: 2 }}>Seleccionar podio</H1Bold>
                                <Stack spacing={2}>
                                    <ButtonSimple onClick={() => {
                                        setPodio({ open: true, nro: 1 })
                                    }} sx={{ bgcolor: '#D4AF37' }}>
                                        {watch('DetalleRifa').find(value => value.podio == 1)?.Producto.nombre || '1er lugar'}
                                    </ButtonSimple>
                                    <ButtonSimple
                                        onClick={() => {
                                            setPodio({ open: true, nro: 2 })
                                        }}
                                        sx={{ bgcolor: '#C0C0C0' }}>
                                        {watch('DetalleRifa').find(value => value.podio == 2)?.Producto.nombre || '2do lugar'}
                                    </ButtonSimple>
                                    <ButtonSimple
                                        onClick={() => {
                                            setPodio({ open: true, nro: 3 })
                                        }}
                                        sx={{ bgcolor: '#CD7F32' }}>
                                        {watch('DetalleRifa').find(value => value.podio == 3)?.Producto.nombre || '3er lugar'}
                                    </ButtonSimple>
                                </Stack>
                            </BoxPaper>
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
            {
                Podio.open ? <ModalProductoRifa watch={watch as any} Podio={Podio} setPodio={setPodio} setValue={setValue as any} /> : null
            }
        </>
    );
}