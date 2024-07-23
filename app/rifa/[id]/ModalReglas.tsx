'use client';
import Dialog from '@mui/material/Dialog';
import { Box } from '@mui/material';
import { H1Bold, Normal } from '@/app/componentes/Letras';

interface Props {
    open: boolean;
    setOpen: any;
}
export default function ModalReglas({ setOpen, open }: Props) {

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
                        Reglas del juego
                    </H1Bold>
                    <Normal>
                       Las reglas son las siguientes:
                    </Normal>
                    <ul>

                        <li>
                            <Normal>
                                Hola
                            </Normal>
                        </li>
                    </ul>
                </Box>
            </Dialog >
        </>


    );
}