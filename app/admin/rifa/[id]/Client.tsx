'use client';
import { MdCelebration, MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { Box, Grid, Stack } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useModal } from '@/providers/ModalProvider';
import { useSnackbar } from '@/providers/SnackBarProvider';
import { DetalleRifa, Producto, Rifa, Ticket } from '@prisma/client';
import { Bold, H1Bold } from '@/app/componentes/Letras';
import { BoxPaper, ButtonFilled, ButtonOutline, ButtonSimple, ChipBox, InputBox, InputLabelStyled } from '@/app/componentes/Cajas';
import { parseNumber, parsePhone } from '@/app/utils/filtros';
import { useState } from 'react';
import axios from 'axios';
import ModalProductoRifa from '../ProductoRifa';
import Tabla from '../../componentes/Tabla';
import { MdAdd } from 'react-icons/md';
import ModalParticipantes from './ModalParticipantes';
import dayjs from 'dayjs';
import { TbReload, TbSquareRoundedNumber1Filled, TbSquareRoundedNumber2Filled, TbSquareRoundedNumber3Filled } from 'react-icons/tb';
import { useRouter } from 'next/navigation';
import { red } from '@mui/material/colors';
import { BiTrash } from 'react-icons/bi';
import 'react-quill/dist/quill.snow.css';
import dynamic from "next/dynamic";
import EditorSkeleton from '@/app/Editor';
const Editor = dynamic(() => import('react-quill').then((module) => module.default), { ssr: false, loading: () => <EditorSkeleton /> });
interface Props {
    Rifa: Rifa & { Ticket: Ticket[], DetalleRifa: (DetalleRifa & { Producto: Producto })[] }
}
export default function Client({ Rifa }: Props) {
    const { openModal } = useModal();
    const router = useRouter();
    const [Open, setOpen] = useState(false);
    const { openSnackbar } = useSnackbar();
    const [Podio, setPodio] = useState({ nro: 0, open: false });
    const { control, handleSubmit, formState: { errors, isDirty }, setValue, watch } = useForm<Rifa & { DetalleRifa: (DetalleRifa & { Producto: Producto })[] }>({
        defaultValues: Rifa
    });

    return (
        <>
            <Grid container component='form' onSubmit={handleSubmit((data) => {
                openModal({
                    titulo: '¿Continuar?',
                    content: 'Se modificará la rifa',
                    callback() {
                        axios.post('/api/rifa/modificar', data).then(res => {
                            openSnackbar(res.data.mensaje);
                        });
                        return true;
                    }
                });
            })} spacing={5} py={10} px={{ xs: 1, sm: 5, md: 10 }}>
                <Grid item xs={12}>
                    <Stack direction='row' spacing={1}>
                        <ButtonOutline onClick={() => router.back()} startIcon={<MdOutlineKeyboardArrowLeft />}>
                            Regresar
                        </ButtonOutline>
                        <ButtonOutline onClick={() => router.refresh()}>
                            <TbReload fontSize={18} />
                        </ButtonOutline>
                        <ButtonFilled
                            onClick={() => {
                                openModal({
                                    titulo: '¿Está seguro?',
                                    content: 'Se cambiará al modo juego',
                                    callback() {
                                        axios.post('/api/rifa/modo', { id: Rifa.id, modo: 'en juego' }).then(res => {
                                            openSnackbar(res.data.mensaje);
                                            if (!res.data.error) {
                                                router.replace(`/admin/rifa/${Rifa.id}/juego`)
                                            }
                                        })
                                        return true;
                                    }
                                })
                            }}
                            sx={{ background: red[400], fontSize: 18 }}
                            endIcon={<MdCelebration />}>
                            Iniciar
                        </ButtonFilled>
                    </Stack>

                </Grid>
                <Grid item xs={12}>
                    <H1Bold sx={{ fontSize: 22, mb: 2 }}>
                        Modificar rifa : {Rifa.id}
                    </H1Bold>
                    <ChipBox label={`Estado: ${Rifa.modo?.toString()}`} />
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
                                disabled
                                helperText={errors.codigoempiezo?.message}
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
                                disabled
                                helperText={errors.monto?.message}
                                InputProps={{ endAdornment: 'BOB' }}
                                error={!!errors.monto}
                                onChange={ev => field.onChange(parseNumber(ev.target.value))}
                            />
                        )}
                    />
                    <Controller
                        name={"categoria"}
                        control={control}
                        rules={{ required: 'Introduzca su categoría' }}
                        render={({ field: { ref, ...field } }) => (
                            <InputBox
                                {...field}
                                inputRef={ref}
                                label='Categoría'
                                helperText={errors.categoria?.message}
                                error={!!errors.categoria}
                            />
                        )}
                    />
                    <Controller
                        name="descripcion"
                        control={control}
                        render={({ field }) => (
                            <Box>
                                <InputLabelStyled sx={{ mb: 1 }}>
                                    Descripción:
                                </InputLabelStyled>
                                <Editor
                                    value={field.value}
                                    modules={{
                                        toolbar: [
                                            [{ 'header': [2, 3, 4, 5, false] }],
                                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                                            ['link'],
                                        ]
                                    }}
                                    preserveWhitespace
                                    className="editor"
                                    onChange={(value) => { field.onChange(value) }}
                                />
                            </Box>
                        )}
                    />
                    <Controller
                        name={"participantes"}
                        control={control}
                        rules={{ required: 'Introduzca participantes requeridos' }}
                        render={({ field: { ref, ...field } }) => (
                            <InputBox
                                sx={{ mt: 3 }}
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

                    <H1Bold sx={{ fontSize: 20, mb: 2 }}>Seleccionar podio</H1Bold>
                    <Stack spacing={2}>
                        <ButtonSimple endIcon={<TbSquareRoundedNumber1Filled />} onClick={() => {
                            setPodio({ open: true, nro: 1 })
                        }} sx={{ bgcolor: '#D4AF37' }}>
                            {watch('DetalleRifa').find(value => value.podio == 1)?.Producto.nombre || '1er lugar'}
                        </ButtonSimple>
                        <ButtonSimple
                            onClick={() => {
                                setPodio({ open: true, nro: 2 })
                            }}
                            endIcon={<TbSquareRoundedNumber2Filled />}
                            sx={{ bgcolor: '#C0C0C0' }}>
                            {watch('DetalleRifa').find(value => value.podio == 2)?.Producto.nombre || '2do lugar'}
                        </ButtonSimple>
                        <ButtonSimple
                            onClick={() => {
                                setPodio({ open: true, nro: 3 })
                            }}
                            endIcon={<TbSquareRoundedNumber3Filled />}
                            sx={{ bgcolor: '#CD7F32' }}>
                            {watch('DetalleRifa').find(value => value.podio == 3)?.Producto.nombre || '3er lugar'}
                        </ButtonSimple>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <ButtonFilled
                        sx={{ float: 'right' }} type='submit'>
                        Guardar cambios
                    </ButtonFilled>
                </Grid>
                <Grid item xs={12}>
                    <H1Bold sx={{ fontSize: 20, mb: 2 }}>Participantes</H1Bold>

                    <ButtonOutline sx={{ mt: 2 }} onClick={() => {
                        setOpen(true);
                    }} startIcon={<MdAdd />}>
                        Agregar
                    </ButtonOutline>
                    <Tabla hasPagination data={Rifa.Ticket.map(value => ({
                        'Código': value.codigo,
                        'Participante': value.nombre || 'anónimo',
                        'Se unío el:': dayjs(value.createdAt).format('DD/MM/YYYY - HH:mm:ss'),
                        '': (<ButtonOutline onClick={() => {
                            openModal({
                                titulo: '¿Continuar?',
                                content: 'Se eliminará el ticket',
                                callback() {
                                    axios.post('/api/ticket/eliminar', { id: value.id }).then(res => {
                                        openSnackbar(res.data.mensaje);
                                    });
                                    return true;
                                }
                            })
                        }} ><BiTrash fontSize={18} /></ButtonOutline>)
                    }))} />
                    <Bold mt={4}>
                        Total acumulado: {Rifa.Ticket.length * Rifa.monto} BOB
                    </Bold>
                </Grid>
            </Grid>
            {
                Podio.open ? <ModalProductoRifa watch={watch as any} Podio={Podio} setPodio={setPodio} setValue={setValue as any} /> : null
            }
            {
                Open ? <ModalParticipantes rifaId={Rifa.id} open={Open} setOpen={setOpen} codigoempiezo={Rifa.codigoempiezo} /> : null
            }
        </>
    );
}