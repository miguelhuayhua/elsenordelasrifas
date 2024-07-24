'use client';
import { Box, Grid, Stack } from '@mui/material';
import { DetalleRifa, Producto, Rifa, Ticket } from '@prisma/client';
import { Bold, H1Bold, Normal } from '@/app/componentes/Letras';
import Image from 'next/legacy/image';
import { ButtonFilled, ButtonSimple, ChipBox, InputBox } from '@/app/componentes/Cajas';
import { FaDiceThree, FaExplosion } from 'react-icons/fa6';
import { amber, red } from '@mui/material/colors';
import { useState } from 'react';
import { TbSquareRoundedNumber1Filled, TbSquareRoundedNumber2Filled, TbSquareRoundedNumber3Filled } from 'react-icons/tb';
import { LuSword } from 'react-icons/lu';
import { useModal } from '@/providers/ModalProvider';
import axios from 'axios';
import { useSnackbar } from '@/providers/SnackBarProvider';
import { useRouter } from 'next/navigation';
interface Props {
    Rifa: Rifa & { Ticket: Ticket[], DetalleRifa: (DetalleRifa & { Producto: Producto })[] };
}
export default function Client({ Rifa }: Props) {
    const [codigo, setCodigo] = useState(new Array(Rifa.codigoempiezo.toString().length).fill(''));
    const [elegido, setElegido] = useState<{ estado: 'fuera' | 'ganador' | 'segundo' | 'tecer' | '', Ganador: Partial<Ticket>, Segundo: Partial<Ticket>, Tercero: Partial<Ticket> }>({ estado: '', Ganador: {}, Segundo: {}, Tercero: {} })
    const [rifa, setRifa] = useState(Rifa);
    const { openModal } = useModal();
    const { openSnackbar } = useSnackbar();
    const router = useRouter();
    return (
        <>
            <Grid container my={4} px={2} spacing={2}>
                <Grid item xs={12} md={6}>
                    <H1Bold sx={{ mb: 2, textAlign: 'center' }}>
                        Premios
                    </H1Bold>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            {
                                Rifa.DetalleRifa[1] ? <>
                                    <Box display='flex' justifyContent='center'>
                                        <TbSquareRoundedNumber2Filled fontSize={45} style={{ color: "#a0a0a0" }} />
                                    </Box>
                                    <Image style={{ borderRadius: 8 }} src={Rifa.DetalleRifa[1].Producto.imagen} width={100} objectFit='cover' height={100} layout="responsive" />
                                    <Bold sx={{ fontSize: 16, mt: 0.5, }}>
                                        {Rifa.DetalleRifa[1].Producto.nombre}
                                    </Bold>
                                    {
                                        elegido.Segundo.id ? <>
                                            <Normal>
                                                Ganador: {elegido.Segundo.codigo}
                                                <br />
                                                {elegido.Segundo.nombre || 'Anónimo'}
                                            </Normal>
                                        </> : null
                                    }
                                </> : null
                            }
                        </Grid>
                        <Grid item xs={4}>
                            {
                                Rifa.DetalleRifa[0] ? <>
                                    <Box display='flex' justifyContent='center'>
                                        <TbSquareRoundedNumber1Filled fontSize={45} style={{ color: "#f7b800" }} />
                                    </Box>
                                    <Image style={{ borderRadius: 8 }} src={Rifa.DetalleRifa[0].Producto.imagen} width={100} objectFit='cover' height={100} layout="responsive" />
                                    <Bold sx={{ fontSize: 16, mt: 0.5, }}>
                                        {Rifa.DetalleRifa[0].Producto.nombre}
                                    </Bold>
                                    {
                                        elegido.Ganador.id ? <>
                                            <Normal>
                                                Ganador: {elegido.Ganador.codigo}
                                                <br />
                                                {elegido.Ganador.nombre || 'Anónimo'}
                                            </Normal>
                                        </> : null
                                    }
                                </> : null
                            }
                        </Grid>
                        <Grid item xs={4}>
                            {
                                Rifa.DetalleRifa[2] ? <>
                                    <Box display='flex' justifyContent='center'>
                                        <TbSquareRoundedNumber3Filled fontSize={45} style={{ color: "#ce783c" }} />
                                    </Box>
                                    <Image style={{ borderRadius: 8 }} src={Rifa.DetalleRifa[2].Producto.imagen} width={100} height={100} objectFit='cover' layout="responsive" />
                                    <Bold sx={{ fontSize: 16, mt: 0.5, }}>
                                        {Rifa.DetalleRifa[2].Producto.nombre}
                                    </Bold>
                                    {
                                        elegido.Tercero.id ? <>
                                            <Normal>
                                                Ganador: {elegido.Tercero.codigo}
                                                <br />
                                                {elegido.Tercero.nombre || 'Anónimo'}
                                            </Normal>
                                        </> : null
                                    }
                                </> : null
                            }
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box display='flex' flexWrap='wrap'>
                        <ButtonFilled
                            onClick={() => {
                                let find = rifa.Ticket.filter(value => value.estado)[Math.floor(Math.random() * rifa.Ticket.filter(value => value.estado).length)];
                                setCodigo([...find.codigo.toString().split('')]);
                                setRifa(prev => ({ ...prev, Ticket: prev.Ticket.map(value => find.codigo == value.codigo ? ({ ...value, estado: false }) : (value)) }))
                            }}
                            sx={{ background: red[400], m: 0.5 }} endIcon={<FaDiceThree />}>
                            Eliminar próximo
                        </ButtonFilled>
                        <ButtonSimple endIcon={<TbSquareRoundedNumber1Filled />}
                            onClick={() => {
                                let find = rifa.Ticket.filter(value => value.estado)[Math.floor(Math.random() * rifa.Ticket.length)];
                                setCodigo([...find.codigo.toString().split('')]);
                                setElegido(prev => ({ ...prev, Ganador: find }));
                                setRifa(prev => ({ ...prev, Ticket: prev.Ticket.filter(value => value.codigo != find.codigo) }));
                            }}
                            disabled={!!elegido.Ganador.id}
                            sx={{ bgcolor: '#D4AF37', m: 0.5 }}>
                            Seleccionar
                        </ButtonSimple>
                        <ButtonSimple
                            onClick={() => {
                                let find = rifa.Ticket.filter(value => value.estado)[Math.floor(Math.random() * rifa.Ticket.length)];
                                setCodigo([...find.codigo.toString().split('')]);
                                setElegido(prev => ({ ...prev, Segundo: find }));
                                setRifa(prev => ({ ...prev, Ticket: prev.Ticket.filter(value => value.codigo != find.codigo) }));
                            }}
                            disabled={!!elegido.Segundo.id}
                            endIcon={<TbSquareRoundedNumber2Filled />}
                            sx={{ bgcolor: '#C0C0C0', m: 0.5 }}>
                            Seleccionar
                        </ButtonSimple>
                        <ButtonSimple
                            onClick={() => {
                                let find = rifa.Ticket.filter(value => value.estado)[Math.floor(Math.random() * rifa.Ticket.length)];
                                setCodigo([...find.codigo.toString().split('')]);
                                setElegido(prev => ({ ...prev, Tercero: find }));
                                setRifa(prev => ({ ...prev, Ticket: prev.Ticket.filter(value => value.codigo != find.codigo) }));
                            }}
                            endIcon={<TbSquareRoundedNumber3Filled />}
                            disabled={!!elegido.Tercero.id}
                            sx={{ bgcolor: '#CD7F32', m: 0.5 }}>
                            Seleccionar
                        </ButtonSimple>
                    </Box>
                    <H1Bold my={2}>Código seleccionado</H1Bold>
                    <Stack spacing={1} direction='row'>
                        {
                            codigo.map((_, i) => (
                                <InputBox key={i} sx={{ ".MuiOutlinedInput-input": { textAlign: 'center' }, ".MuiInputBase-root": { fontSize: 30, fontWeight: 900 } }} value={codigo[i]} />
                            ))
                        }
                    </Stack>
                </Grid>
                <Grid item xs={12} md={8} p={2}>
                    <Bold sx={{ mb: 2, fontSize: 17 }}>
                        Jugando
                    </Bold>
                    <Box display='flex' flexWrap={'wrap'}>
                        {
                            rifa.Ticket.filter(value => value.estado).map(value => (<ChipBox sx={{ m: 0.5 }} icon={<LuSword />} key={value.id} label={`${value.codigo} - ${value.nombre || 'Anónimo'}`} />))
                        }
                    </Box>
                </Grid>
                <Grid item xs={12} md={4} p={2}>
                    <Bold sx={{ mb: 2, fontSize: 17, color: red[400] }}>
                        Fuera
                    </Bold>
                    <Box display='flex' flexWrap={'wrap'}>
                        {
                            rifa.Ticket.filter(value => !value.estado).map(value => (<ChipBox sx={{ border: `1px solid ${red[400]}`, m: 0.5 }} icon={<FaExplosion color={amber[700]} />} key={value.id} label={`${value.codigo} - ${value.nombre || 'Anónimo'}`} />))
                        }
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <ButtonFilled onClick={() => {
                        openModal({
                            titulo: '¿Terminar el juego?',
                            content:
                                <Box>
                                    <Normal>
                                        Ganadores:
                                        <br />
                                        1er lugar: {`${elegido.Ganador.codigo} - ${elegido.Ganador.nombre || ' Anónimo'}`}
                                        <br />
                                        2do lugar: {`${elegido.Segundo.codigo} - ${elegido.Segundo.nombre || ' Anónimo'}`}
                                        <br />
                                        3er lugar: {`${elegido.Tercero.codigo} - ${elegido.Tercero.nombre || ' Anónimo'}`}
                                    </Normal>
                                </Box>,
                            callback() {
                                axios.post('/api/rifa/terminar', {
                                    ganador: elegido.Ganador.codigo,
                                    segundo: elegido.Segundo.codigo, tercero: elegido.Tercero.codigo,
                                    modo: 'terminado', id: rifa.id, totalIngresos: Rifa.monto * Rifa.Ticket.length
                                }).then(res => {
                                    openSnackbar(res.data.mensaje);
                                    if (!res.data.error) {
                                        router.replace('/admin/rifa');
                                    }
                                });
                                return true;
                            }
                        })
                    }} >
                        Concluir Rifa
                    </ButtonFilled>
                </Grid>
            </Grid>
        </>
    );
}