'use client';
import { Bold, H1Bold } from "@/app/componentes/Letras";
import { Box, Grid, Stack } from "@mui/material";
import { Producto } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Tabla from "../componentes/Tabla";
import { ButtonFilled } from "@/app/componentes/Cajas";
import { MdAdd } from "react-icons/md";
import ModalProducto from "./ModalProducto";
import { TbReload } from "react-icons/tb";
import Image from "next/image";
import dayjs from "dayjs";
export default function Home() {
    const [open, setOpen] = useState(false);
    const [Productos, setProductos] = useState<Producto[]>([]);
    useEffect(() => {
        axios.post('/api/producto/todo').then(res => {
            setProductos(res.data);
        });
    }, []);
    return (
        <>
            <Grid container spacing={4} p={5}>
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
                        data={Productos.map(value => ({
                            id: value.id,
                            Producto: (
                                <Box display='flex' minWidth={300} py={0.35}>
                                    <Image alt="" src={value.imagen} width={60} height={60} objectFit="cover" layout="fixed" style={{ borderRadius: 10 }} />
                                    <Box px={2}>
                                        <Bold>{value.nombre}</Bold>
                                    </Box>
                                </Box>
                            ),
                            "Creado el": dayjs(value.createdAt).format('DD/MM/YYYY [ a las ] HH:mm:ss')
                        }))}>
                    </Tabla>
                </Grid>
            </Grid>
            {
                open ?
                    <ModalProducto setOpen={setOpen} open={open} />
                    : null
            }
        </>
    );
}
