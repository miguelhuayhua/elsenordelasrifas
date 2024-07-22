'use client';
import { H1Bold, Normal } from "@/app/componentes/Letras";
import { Box, Grid, Stack } from "@mui/material";
import { DetalleRifa, Producto, Rifa } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Tabla from "../componentes/Tabla";
import { ButtonFilled, SwitchStyled } from "@/app/componentes/Cajas";
import { MdAdd } from "react-icons/md";
import ModalRifa from "./ModalRifa";
import { TbReload } from "react-icons/tb";
import { BiPencil, BiTrash } from "react-icons/bi";
import { useModal } from "@/providers/ModalProvider";
import { useSnackbar } from "@/providers/SnackBarProvider";
import { FaEye } from "react-icons/fa6";
export default function Home() {
    const [open, setOpen] = useState(false);
    const [Rifas, setRifas] = useState<(Rifa & { DetalleRifa: (DetalleRifa & { Producto: Producto })[] })[]>([]);
    const { openModal } = useModal();
    const { openSnackbar } = useSnackbar();
    const router = useRouter();
    useEffect(() => {
        axios.post('/api/rifa/todo').then(res => {
            setRifas(res.data);
        });
    }, []);
    return (
        <>
            <Grid container spacing={4} p={5}>
                <Grid item xs={12}>
                    <H1Bold sx={{ fontSize: 25 }}>
                        Tus rifas
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
                                axios.post('/api/rifa/todo').then(res => {
                                    setRifas(res.data);
                                });
                            }}>
                            <TbReload fontSize={22} />
                        </ButtonFilled>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Tabla
                        data={Rifas.map(value => ({
                            id: value.id,
                            nombre: value.monto,
                            Productos: (<Box>
                                {value.DetalleRifa.map(value => (
                                    <Normal key={value.id}>{value.Producto.nombre}</Normal>
                                ))}
                            </Box>),
                            '': (
                                <Stack direction='row' spacing={2}>
                                    <ButtonFilled onClick={() => {
                                        openModal({
                                            titulo: '¿Continuar?',
                                            content: 'Se eliminará la rifa',
                                            callback() {
                                                axios.post('/api/rifa/eliminar', { id: value.id }).then(res => {
                                                    openSnackbar(res.data.mensaje);
                                                    if (!res.data.error) {
                                                        setOpen(false);
                                                        axios.post('/api/rifa/todo').then(res => {
                                                            setRifas(res.data);
                                                        });
                                                    }
                                                });
                                                return true;
                                            }
                                        });
                                    }}><BiTrash /></ButtonFilled>
                                    <ButtonFilled onClick={() => router.push('/admin/rifa/' + value.id)}>
                                        <FaEye />
                                    </ButtonFilled>
                                    <SwitchStyled />
                                </Stack>
                            )
                        }))}>
                    </Tabla>
                </Grid>
            </Grid>
            {
                open ?
                    <ModalRifa setOpen={setOpen} open={open} />
                    : null
            }
        </>
    );
}
