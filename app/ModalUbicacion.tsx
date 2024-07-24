'use client';
import Dialog from '@mui/material/Dialog';
import { Box } from '@mui/material';
import { H1Bold, Normal } from '@/app/componentes/Letras';
interface Props {
    open: boolean;
    setOpen: any;
}
export default function ModalUbicacion({ setOpen, open }: Props) {
    return (
        <>
            <Dialog
                open={open}
                keepMounted={false}
                maxWidth='md'
                fullWidth
                onClose={() => { setOpen(false) }}
            >
                <Box p={2}>
                    <H1Bold>
                        Entrega de los premios
                    </H1Bold>
                    <Normal>
                        A los ganadores enviaremos la fecha y hora para la entrega de sus premios, la ubicación es en los teleféricos de La Paz.
                        Ten en cuenta que los participantes son para la ciudad de La Paz y El Alto.
                    </Normal>
                </Box>
            </Dialog >
        </>


    );
}