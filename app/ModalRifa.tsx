'use client';
import Dialog from '@mui/material/Dialog';
import { Box, Grid } from '@mui/material';
import { IoMdCamera } from "react-icons/io";
import { Controller, useForm } from 'react-hook-form';
import { useModal } from '@/providers/ModalProvider';
import { GiPodiumSecond, GiPodiumThird, GiPodiumWinner } from "react-icons/gi";
import { DetalleRifa, Producto, Rifa, Ticket } from '@prisma/client';
import { Bold, H1Bold } from '@/app/componentes/Letras';
import Image from 'next/legacy/image';
import { indigo, red } from '@mui/material/colors';
import { ButtonFilled, ChipBox } from './componentes/Cajas';
interface Props {
    Rifa: Rifa & { Ticket: Ticket[], DetalleRifa: (DetalleRifa & { Producto: Producto })[] };
    setRifa: any;
}
export default function ModalRifa({ Rifa, setRifa }: Props) {

    return (
        <>
            <Dialog
                open={!!Rifa}
                keepMounted={false}
                maxWidth='md'
                fullWidth
                onClose={() => { setRifa(null) }}
            >
                <Box p={2} >
                    <H1Bold sx={{ mb: 2, fontSize: 18, textAlign: 'center' }}>
                        Premios
                    </H1Bold>
                    <H1Bold sx={{ position: 'absolute', right: 5, top: 5, fontSize: 15 }}>
                        Participación: <span style={{ color: red[400] }}>{Rifa.monto}</span> Bs.
                    </H1Bold>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            {
                                Rifa.DetalleRifa[1] ? <>
                                    <Box display='flex' justifyContent='center'><GiPodiumSecond fontSize={50} color='#C0C0C0' /></Box>
                                    <Image style={{ borderRadius: 8 }} src={Rifa.DetalleRifa[1].Producto.imagen} width={100} height={100} layout="responsive" />
                                    {Rifa.DetalleRifa[1].Producto.nombre}
                                </> : null
                            }
                        </Grid>
                        <Grid item xs={4}>
                            {
                                Rifa.DetalleRifa[0] ? <>
                                    <Box display='flex' justifyContent='center'><GiPodiumWinner fontSize={50} color='#f7b800' /></Box>
                                    <Image style={{ borderRadius: 8 }} src={Rifa.DetalleRifa[0].Producto.imagen} width={100} height={100} layout="responsive" />
                                    {Rifa.DetalleRifa[0].Producto.nombre}
                                </> : null
                            }
                        </Grid>
                        <Grid item xs={4}>
                            {
                                Rifa.DetalleRifa[2] ? <>
                                    <Box display='flex' justifyContent='center'><GiPodiumThird fontSize={50} color='#ce783c' /></Box>
                                    <Image style={{ borderRadius: 8 }} src={Rifa.DetalleRifa[2].Producto.imagen} width={100} height={100} layout="responsive" />
                                    {Rifa.DetalleRifa[2].Producto.nombre}
                                </> : null
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <Bold>
                                Participantes requeridos: <span style={{ color: indigo[400] }}>{Rifa.Ticket.length}</span> de <span style={{ fontSize: 25, color: red[400] }}>{Rifa.participantes}</span>
                            </Bold>
                            <ChipBox label={'En espera'} />
                            <br />
                            <ButtonFilled>
                                Unirme al grupo
                            </ButtonFilled>
                        </Grid>
                    </Grid>
                </Box>

            </Dialog >
        </>


    );
}