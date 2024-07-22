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
import ModalProductoRifa from '../ProductoRifa';
interface Props {
    Rifa: Rifa & { DetalleRifa: (DetalleRifa & { Producto: Producto })[] }
}
export default function Client({ Rifa }: Props) {
    const { openModal } = useModal();
    const { openSnackbar } = useSnackbar();
    const [Podio, setPodio] = useState({ nro: 0, open: false });
    const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm<Rifa & { DetalleRifa: (DetalleRifa & { Producto: Producto })[] }>({
        defaultValues: Rifa
    });

    const onSubmit = (Rifa: Rifa & { DetalleRifa: (DetalleRifa & { Producto: Producto })[] }) => {
        openModal({
            titulo: '¿Continuar?',
            content: 'Se modificará la rifa',
            callback() {
                axios.post('/api/rifa/modificar', Rifa).then(res => {
                    openSnackbar(res.data.mensaje);
                });
                return true;
            }
        });
    }
    return (
        <>
            <Grid container spacing={5} p={5}>
                <Grid item xs={12}>
                    <H1Bold sx={{ fontSize: 22 }}>
                        Modificar rifa : {Rifa.id}
                    </H1Bold>
                </Grid>
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
                                variant='standard'
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
                                variant='standard'
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
                                variant='standard'
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
                <Grid item xs={12} sm={6}>
                    <H1Bold sx={{ fontSize: 20, mb: 2 }}>Introducir participantes</H1Bold>
                </Grid>
                <Grid item xs={12}>
                    <ButtonFilled
                        sx={{ float: 'right' }} type='submit'>
                        Guardar cambios
                    </ButtonFilled>
                </Grid>
            </Grid>
            {
                Podio.open ? <ModalProductoRifa watch={watch as any} Podio={Podio} setPodio={setPodio} setValue={setValue as any} /> : null
            }
        </>
    );
}