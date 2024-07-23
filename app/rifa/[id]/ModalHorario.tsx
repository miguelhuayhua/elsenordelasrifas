'use client';
import Dialog from '@mui/material/Dialog';
import { Box } from '@mui/material';
import { H1Bold, Normal } from '@/app/componentes/Letras';

interface Props {
    open: boolean;
    setOpen: any;
}
export default function ModalHorario({ setOpen, open }: Props) {

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
                        Horarios de inicio
                    </H1Bold>
                    <Normal>
                        Los horarios son nocturnos, enviaremos en nuestro grupo el link de acceso a la reunión de la rifa
                        todos podrán ver los números que van saliendo, pronto en vivos en Tik Tok.
                    </Normal>
                </Box>
            </Dialog >
        </>


    );
}