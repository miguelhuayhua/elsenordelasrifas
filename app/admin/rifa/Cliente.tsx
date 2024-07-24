'use client';
import { H1Bold, Normal } from "@/app/componentes/Letras";
import { Box, Grid, Stack } from "@mui/material";
import { DetalleRifa, Producto, Rifa, Ticket } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Tabla from "../componentes/Tabla";
import { ButtonFilled, ButtonOutline, SwitchStyled } from "@/app/componentes/Cajas";
import { MdAdd } from "react-icons/md";
import ModalRifa from "./ModalRifa";
import { TbReload } from "react-icons/tb";
import { BiTrash } from "react-icons/bi";
import { useModal } from "@/providers/ModalProvider";
import { useSnackbar } from "@/providers/SnackBarProvider";
import { FaEye } from "react-icons/fa6";
interface Props {
    Rifas: (Rifa & { Ticket: Ticket[], DetalleRifa: (DetalleRifa & { Producto: Producto })[] })[]
}
export default function Client({ Rifas }: Props) {
    const [open, setOpen] = useState(false);
    const { openModal } = useModal();
    const { openSnackbar } = useSnackbar();
    const router = useRouter();
    return (
        <>
            <Grid container spacing={4} p={5}>
                <Grid item xs={12}>
                    <H1Bold sx={{ fontSize: 25, mt: 4 }}>
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
                                router.refresh();
                            }}>
                            <TbReload fontSize={22} />
                        </ButtonFilled>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Tabla
                        data={Rifas.map(value => ({
                            id: value.id,
                            'Monto de entrada': value.monto + " BOB",
                            Ganadores: value.modo == 'terminado' ? (`1er ${value.ganador || ''} - 2do ${value.segundo || ''} - 3er ${value.tercero || ''}`) : 'No iniciado aún',
                            Productos: (<Box>
                                {value.DetalleRifa.map(value => (
                                    <Normal key={value.id}>{value.Producto.nombre}</Normal>
                                ))}
                            </Box>),
                            'Total reunido': value.modo == 'terminado' ? value.totalIngresos + " BOB" : `${value.Ticket.length * value.monto} BOB`,
                            '': (
                                <Stack direction='row' spacing={2}>
                                    <ButtonOutline onClick={() => {
                                        openModal({
                                            titulo: '¿Continuar?',
                                            content: 'Se eliminará la rifa',
                                            callback() {
                                                axios.post('/api/rifa/eliminar', { id: value.id }).then(res => {
                                                    openSnackbar(res.data.mensaje);
                                                    if (!res.data.error) {
                                                        setOpen(false);
                                                        router.refresh();
                                                    }
                                                });
                                                return true;
                                            }
                                        });
                                    }}><BiTrash fontSize={18} /></ButtonOutline>
                                    <ButtonFilled onClick={() => router.push('/admin/rifa/' + value.id)}>
                                        <FaEye />
                                    </ButtonFilled>

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
