'use client';
import { Bold, H1Bold } from "@/app/componentes/Letras";
import { Box, Grid, Stack } from "@mui/material";
import { Producto } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import Tabla from "../componentes/Tabla";
import { ButtonFilled } from "@/app/componentes/Cajas";
import { MdAdd, MdOutlineCameraAlt } from "react-icons/md";
import ModalProducto from "./ModalProducto";
import { TbReload } from "react-icons/tb";
import Image from "next/legacy/image";
import dayjs from "dayjs";
import { BiPencil } from "react-icons/bi";
export default function Home() {
    const [open, setOpen] = useState(false);
    const [Productos, setProductos] = useState<Producto[]>([]);
    const [Producto, setProducto] = useState<Partial<Producto>>({ imagen: '', nombre: '', id: '', estado: true, valor: 0 });
    useEffect(() => {
        axios.post('/api/producto/todo').then(res => {
            setProductos(res.data);
        });
    }, []);
    return (
        <>
            <Grid container spacing={4} px={{ xs: 1, md: 5 }} mt={4}>
                <Grid item xs={12}>
                    <H1Bold sx={{ fontSize: 25 }}>
                        Tus Productos
                    </H1Bold>
                </Grid>
                <Grid item xs={12}>
                    <Stack spacing={2} direction='row'>
                        <ButtonFilled
                            onClick={() => {
                                setOpen(true);
                            }}
                            startIcon={<MdAdd />}>Crear</ButtonFilled>
                        <ButtonFilled
                            onClick={() => {
                                axios.post('/api/producto/todo').then(res => {
                                    setProductos(res.data);
                                });
                            }}
                        ><TbReload fontSize={22} /></ButtonFilled>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Tabla
                        skipColumns={{ nombre: true }}
                        hasPagination
                        data={Productos.map(value => ({
                            id: value.id,
                            Producto: (
                                <Box display='flex' minWidth={250} py={0.35}>
                                    <Box width={70} height={70} minWidth={70} display='flex' justifyContent='center' alignItems='center' position='relative'>
                                        {value.imagen ?
                                            <Image alt="" src={value.imagen} objectFit="cover" layout="fill" style={{ borderRadius: 10 }} /> : <MdOutlineCameraAlt fontSize={25} color='#777' />}
                                    </Box>
                                    <Box px={2}>
                                        <Bold>{value.nombre}</Bold>
                                    </Box>
                                </Box>
                            ),
                            nombre: value.nombre,
                            Valor: `${value.valor} BOB`,
                            Referencia: value.referencia || 'Sin referencia',
                            "Creado el": dayjs(value.createdAt).format('DD/MM/YYYY [ a las ] HH:mm:ss'),
                            "": (<ButtonFilled onClick={() => {
                                setProducto(value);
                                setOpen(true);
                            }}><BiPencil /></ButtonFilled>)
                        }))}>
                    </Tabla>
                </Grid>
            </Grid>
            {
                open ?
                    <ModalProducto Producto={Producto as any} setOpen={setOpen} open={open} />
                    : null
            }
        </>
    );
}
