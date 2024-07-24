'use client';
import Dialog from '@mui/material/Dialog';
import { Box } from '@mui/material';
import { H1Bold, Normal } from '@/app/componentes/Letras';
interface Props {
    open: boolean;
    setOpen: any;
}
export default function ModalReembolsos({ setOpen, open }: Props) {
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
                        Reembolsos
                    </H1Bold>
                    <Normal>
                        Por favor, únase a nuestro grupo y contacte al administrador, le devolveremos el monto Total - 1 Bs. y le agregaremos a una rifa simple del mismo
                        valor de participación.
                    </Normal>
                </Box>
            </Dialog >
        </>


    );
}