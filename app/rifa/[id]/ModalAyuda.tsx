'use client';
import Dialog from '@mui/material/Dialog';
import { Box } from '@mui/material';
import { H1Bold, Normal } from '@/app/componentes/Letras';
import { ButtonOutline } from '@/app/componentes/Cajas';

interface Props {
    open: boolean;
    setOpen: any;
}
export default function ModalAyuda({ setOpen, open }: Props) {


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
                        Cómo puedo participar
                    </H1Bold>
                    <Normal>
                        Únete a nuestro grupo de grupo en el botón de {'"unirme al grupo"'}
                        , enviaremos un QR en donde podrás depositar el valor del ticket, envía al administrador y este te enviará tu ticket digital
                        en la cual contendrá un QR y tu código y espera a que informemos el inicio de la rifa en nuestro grupo.
                    </Normal>
                    <ButtonOutline sx={{ mt: 3 }}>
                        Unirme al grupo
                    </ButtonOutline>
                </Box>
            </Dialog >
        </>


    );
}