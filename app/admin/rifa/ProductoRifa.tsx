'use client';
import Dialog from '@mui/material/Dialog';
import { Box } from '@mui/material';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { DetalleRifa, Producto } from '@prisma/client';
import { Bold, H1Bold } from '@/app/componentes/Letras';
import { ButtonFilled, ButtonOutline } from '@/app/componentes/Cajas';
import Image from 'next/legacy/image';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Tabla from '../componentes/Tabla';
interface Props {
    Podio: { open: boolean, nro: number };
    setPodio: any;
    setValue: UseFormSetValue<{
        id: string;
        monto: number;
        ganador: string;
        codigomin: number;
        codigomax: number;
        createdAt: Date;
    } & {
        DetalleRifa: (DetalleRifa & { Producto: Producto })[];
    }>;
    watch: UseFormWatch<{
        id: string;
        monto: number;
        ganador: string;
        codigomin: number;
        codigomax: number;
        createdAt: Date;
    } & {
        DetalleRifa: (DetalleRifa & { Producto: Producto })[];
    }>;
}
export default function ModalProductoRifa({ Podio, setPodio, setValue, watch }: Props) {
    const [Productos, setProductos] = useState<Producto[]>([]);
    useEffect(() => {
        axios.post('/api/producto/todo').then(res => {
            setProductos(res.data);
        });
    }, []);
    return (
        <>
            <Dialog
                open={Podio.open}
                keepMounted={false}
                maxWidth='xs'
                fullWidth
                onClose={() => { setPodio({ open: false, nro: 0 }) }}
            >
                <Box p={2} >
                    <ButtonFilled sx={{ float: 'right' }} onClick={() => {
                        setValue('DetalleRifa', [...watch('DetalleRifa').filter(value => value.podio != Podio.nro)]);
                        setPodio({ open: false, nro: 0 })
                    }}>Quitar</ButtonFilled>
                    <H1Bold sx={{ fontSize: 22 }} mb={2}>
                        Seleccionar producto
                    </H1Bold>
                    <Tabla
                        data={Productos.map(value => ({
                            id: value.id,
                            Producto: (
                                <Box display='flex' minWidth={160} py={0.35}>
                                    <Image alt="" src={value.imagen} width={60} height={60} objectFit="cover" layout="fixed" style={{ borderRadius: 10 }} />
                                    <Box px={2}>
                                        <Bold>{value.nombre}</Bold>
                                    </Box>
                                </Box>
                            ),
                            '': (<ButtonOutline
                                onClick={() => {
                                    setValue('DetalleRifa', [...watch('DetalleRifa').filter(value => value.podio != Podio.nro), { productoId: value.id, id: '', rifaId: '', podio: Podio.nro, Producto: value }])
                                    setPodio({ open: false, nro: 0 })
                                }}>Seleccionar</ButtonOutline>)
                        }))}>
                    </Tabla>
                </Box>
            </Dialog >

        </>
    );
}