'use client';
import { Box, Grid, Stack } from '@mui/material';
import { GiPodiumSecond, GiPodiumThird, GiPodiumWinner } from "react-icons/gi";
import { DetalleRifa, Producto, Rifa, Ticket } from '@prisma/client';
import { Bold, H1Bold } from '@/app/componentes/Letras';
import Image from 'next/legacy/image';
import { useRouter } from 'next/navigation';
import { ButtonFilled, InputBox } from '@/app/componentes/Cajas';
import { FaDiceThree } from 'react-icons/fa6';
import { red } from '@mui/material/colors';
import { useState } from 'react';
import { TbCornerDownRightDouble } from 'react-icons/tb';
interface Props {
    Rifa: Rifa & { Ticket: Ticket[], DetalleRifa: (DetalleRifa & { Producto: Producto })[] };
}
export default function Client({ Rifa }: Props) {
    const router = useRouter();
    const [codigo, setCodigo] = useState(new Array(Rifa.codigoempiezo.toString().length).fill(''));
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
                                    <Box display='flex' justifyContent='center'><GiPodiumSecond fontSize={50} color='#C0C0C0' /></Box>
                                    <Image style={{ borderRadius: 8 }} src={Rifa.DetalleRifa[1].Producto.imagen} width={100} objectFit='cover' height={100} layout="responsive" />
                                    <Bold>
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
                                    <Bold>
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
                                    <Bold>
                                        {Rifa.DetalleRifa[2].Producto.nombre}
                                    </Bold>
                                </> : null
                            }
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <ButtonFilled
                        onClick={() => {
                            console.log(Math.floor(Math.random() * Rifa.Ticket.length))
                        }}
                        sx={{ background: red[400] }} endIcon={<FaDiceThree />}>
                        Próximo número
                    </ButtonFilled>
                    <H1Bold my={2}>Código seleccionado</H1Bold>
                    <Stack spacing={1} direction='row'>
                        {
                            codigo.map((_, i) => (
                                <InputBox key={i} sx={{ ".MuiOutlinedInput-input": { textAlign: 'center' }, ".MuiInputBase-root": { fontSize: 30, fontWeight: 900 } }} value={codigo[i]} />
                            ))
                        }
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
}