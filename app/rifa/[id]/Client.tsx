'use client';
import { Box, Grid, List, ListItem, ListItemText, Stack } from '@mui/material';
import { GiPodiumSecond, GiPodiumThird, GiPodiumWinner } from "react-icons/gi";
import { DetalleRifa, Producto, Rifa, Ticket } from '@prisma/client';
import { Bold, H1Bold, Normal } from '@/app/componentes/Letras';
import Image from 'next/legacy/image';
import { amber, indigo, red } from '@mui/material/colors';
import { LuRuler } from "react-icons/lu";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { ButtonFilled, ButtonOutline, ChipBox } from '@/app/componentes/Cajas';
import { FaRegClock } from 'react-icons/fa6';
import { MdOutlineKeyboardArrowLeft, MdOutlineLocationOn } from 'react-icons/md';
import { useState } from 'react';
import ModalAyuda from './ModalAyuda';
import ModalHorario from './ModalHorario';
import ModalUbicacion from './ModalUbicacion';
import { useRouter } from 'next/navigation';
import { TbSquareRoundedNumber1Filled, TbSquareRoundedNumber2Filled, TbSquareRoundedNumber3Filled } from 'react-icons/tb';
import ModalReglas from './ModalReglas';
interface Props {
    Rifa: Rifa & { Ticket: Ticket[], DetalleRifa: (DetalleRifa & { Producto: Producto })[] };
}
export default function Client({ Rifa }: Props) {
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const router = useRouter();
    return (
        <>
            <Box px={{ xs: 1, sm: 5 }}>
                <Box mx='auto' display='flex' justifyContent='center'>
                    <Image src='/senordelasrifas.png' width={220} height={200} alt="logo señor de la rifa" />
                </Box>
                <Stack direction='row' spacing={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <ButtonOutline onClick={() => setOpen1(true)}>
                        <AiOutlineQuestionCircle fontSize={40} />
                    </ButtonOutline>
                    <ButtonOutline onClick={() => setOpen2(true)}>
                        <MdOutlineLocationOn fontSize={40} />
                    </ButtonOutline>
                    <ButtonOutline onClick={() => setOpen3(true)}>
                        <FaRegClock fontSize={35} />
                    </ButtonOutline>
                    <ButtonOutline onClick={() => setOpen4(true)}>
                        <LuRuler fontSize={35} />
                    </ButtonOutline>
                </Stack>
            </Box>

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
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            {
                                Rifa.DetalleRifa[1] ? <>
                                    <Box display='flex' justifyContent='center'><GiPodiumSecond fontSize={50} color='#a0a0a0' /></Box>
                                    <Image style={{ borderRadius: 8 }} src={Rifa.DetalleRifa[1].Producto.imagen} width={100} objectFit='cover' height={100} layout="responsive" />
                                    <Bold sx={{ fontSize: 18, mt: 0.5, display: 'flex', alignItems: 'center' }}>
                                        <TbSquareRoundedNumber2Filled fontSize={25} style={{ marginRight: 5, color: "#a0a0a0" }} />
                                        {Rifa.DetalleRifa[1].Producto.nombre}
                                    </Bold>
                                </> : null
                            }
                        </Grid>
                        <Grid item xs={4}>
                            {
                                Rifa.DetalleRifa[0] ? <>
                                    <Box display='flex' justifyContent='center'><GiPodiumWinner fontSize={50} color='#f7b800' /></Box>
                                    <Image style={{ borderRadius: 8 }} src={Rifa.DetalleRifa[0].Producto.imagen} width={100} objectFit='cover' height={100} layout="responsive" />
                                    <Bold sx={{ fontSize: 18, mt: 0.5, display: 'flex', alignItems: 'center' }}>
                                        <TbSquareRoundedNumber1Filled fontSize={25} style={{ marginRight: 5, color: "#f7b800" }} />
                                        {Rifa.DetalleRifa[0].Producto.nombre}
                                    </Bold>
                                </> : null
                            }
                        </Grid>
                        <Grid item xs={4}>
                            {
                                Rifa.DetalleRifa[2] ? <>
                                    <Box display='flex' justifyContent='center'><GiPodiumThird fontSize={50} color='#ce783c' /></Box>
                                    <Image style={{ borderRadius: 8 }} src={Rifa.DetalleRifa[2].Producto.imagen} width={100} height={100} objectFit='cover' layout="responsive" />
                                    <Bold sx={{ fontSize: 18, mt: 0.5, display: 'flex', alignItems: 'center' }}>
                                        <TbSquareRoundedNumber3Filled fontSize={25} style={{ marginRight: 5, color: "#ce783c" }} />
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
                            <Bold>
                                Participantes requeridos: <span style={{ color: indigo[400] }}>{Rifa.Ticket.length}</span> de <span style={{ fontSize: 25, color: red[400] }}>{Rifa.participantes}</span>
                            </Bold>
                            <ChipBox label={`Estado: ${Rifa.modo?.toUpperCase()}`} />
                            <br />
                            <Stack direction='row' spacing={2} mt={2}>
                                <ButtonFilled>
                                    Unirme al grupo
                                </ButtonFilled>
                                {
                                    Rifa.monto > 5 ?
                                        <ButtonOutline>
                                            Solicitar reembolso
                                        </ButtonOutline> : null
                                }
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid xs={12} sm={6} px={2}>
                    <H1Bold sx={{ textAlign: 'center' }}>
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
            <ModalAyuda open={open1} setOpen={setOpen1} />
            <ModalHorario open={open3} setOpen={setOpen3} />
            <ModalUbicacion open={open2} setOpen={setOpen2} />
            <ModalReglas open={open4} setOpen={setOpen4} />
        </>


    );
}