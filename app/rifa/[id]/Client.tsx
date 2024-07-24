'use client';
import { Box, Grid, List, ListItem, ListItemText, Stack } from '@mui/material';
import { DetalleRifa, Producto, Rifa, Ticket } from '@prisma/client';
import { Bold, H1Bold, Normal } from '@/app/componentes/Letras';
import 'react-quill/dist/quill.snow.css';
import Image from 'next/legacy/image';
import { indigo, red } from '@mui/material/colors';
import { ButtonFilled, ButtonOutline, ChipBox } from '@/app/componentes/Cajas';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TbSquareRoundedNumber1Filled, TbSquareRoundedNumber2Filled, TbSquareRoundedNumber3Filled } from 'react-icons/tb';
import Link from 'next/link';
import HTMLReactParser from "html-react-parser";
import ModalReembolsos from './ModalReembolso';
interface Props {
    Rifa: Rifa & { Ticket: Ticket[], DetalleRifa: (DetalleRifa & { Producto: Producto })[] };
}
export default function Client({ Rifa }: Props) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    return (
        <>
            <Grid container my={4} px={2}>
                <Grid item xs={12}>
                    <ButtonOutline onClick={() => router.back()} startIcon={<MdOutlineKeyboardArrowLeft />}>
                        Regresar
                    </ButtonOutline>
                </Grid>
                <Grid item xs={12} md={6}>
                    <H1Bold sx={{ mb: 2, textAlign: 'center' }}>
                        Premios
                    </H1Bold>
                    <Grid container spacing={3}>
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
                                </> : null
                            }
                        </Grid>
                        <Grid item xs={12}>

                            <H1Bold sx={{ fontSize: 20 }}>
                                Participación: <span style={{ color: red[400] }}>{Rifa.monto}</span> Bs.
                            </H1Bold>
                            {
                                Rifa.ganador ?
                                    <Normal sx={{ color: '#f7b800' }}><b>Ganador: {Rifa.ganador}</b></Normal> : null
                            }
                            {
                                Rifa.segundo ?
                                    <Normal sx={{ color: '#a0a0a0' }}><b>2do lugar: {Rifa.segundo}</b></Normal> : null
                            }
                            {
                                Rifa.tercero ?
                                    <Normal sx={{ color: '#ce783c' }}><b>3er lugar: {Rifa.tercero}</b></Normal> : null
                            }
                            <Bold my={2}>
                                Participantes requeridos: <span style={{ color: indigo[400] }}>{Rifa.Ticket.length}</span> de <span style={{ fontSize: 25, color: red[400] }}>{Rifa.participantes}</span>
                            </Bold>
                            <ChipBox label={`Estado: ${Rifa.modo?.toUpperCase()}`} />
                            <br />
                            <Stack direction='row' spacing={2} mt={2}>
                                {
                                    <Link href='https://chat.whatsapp.com/BcpN3rDlRn7InCpdMMUTIQ' target='_blank'>
                                        <ButtonFilled>
                                            Unirme al grupo
                                        </ButtonFilled>
                                    </Link>
                                }
                                {
                                    Rifa.monto >= 5 ?
                                        <ButtonOutline onClick={() => { setOpen(true) }}>
                                            Solicitar reembolso
                                        </ButtonOutline> : null
                                }
                            </Stack>
                            <H1Bold mt={2}>
                                Descripción:
                            </H1Bold>
                            <Box className='ql-editor'>
                                {Rifa.descripcion ? HTMLReactParser(Rifa.descripcion) : 'Sin descripción'}
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid xs={12} sm={6} px={2}>
                    <H1Bold sx={{ textAlign: 'center', fontSize: 16, color: red[400] }}>
                        Lista de participantes
                    </H1Bold>
                    <List>
                        {Rifa.Ticket.map(value => (
                            <ListItem key={value.id}>
                                <ListItemText>
                                    <Normal><b>Nro: </b>{value.codigo}</Normal>
                                    <Normal><b>Participante: </b>{value.nombre || 'Anónimo'} </Normal>
                                </ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            </Grid>
            <ModalReembolsos open={open} setOpen={setOpen} />
        </>
    );
}