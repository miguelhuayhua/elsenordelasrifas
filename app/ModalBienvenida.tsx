'use client';
import Dialog from '@mui/material/Dialog';
import { Box } from '@mui/material';
import { Bold, H1Bold, Normal } from '@/app/componentes/Letras';
import { useState } from 'react';
import { ButtonFilled } from './componentes/Cajas';
import { useCookies } from 'react-cookie';
import { red } from '@mui/material/colors';
import dayjs from 'dayjs';
export default function ModalBienvenida() {
    const [cookies, setCookies] = useCookies(['leido']);
    const [open, setOpen] = useState(cookies.leido != 1);
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
                    <H1Bold sx={{ textAlign: 'center' }}>
                        BIENVENIDO AL SEÑOR DE LA RIFA
                    </H1Bold>
                    <Normal>
                        Por favor, asegúrate de haber léido las reglas, entrega de premios, inscripciones y nuestras reuniones de sorteo antes de empezar.
                    </Normal>
                    <Bold textAlign='center' mt={2}>
                        Diviértete a través de nuestra nueva dinámica.
                    </Bold>

                    <ButtonFilled
                        onClick={() => {
                            let expira = dayjs().add(30, 'days');
                            setCookies('leido', 1, { path: '/', expires: expira.toDate() });
                            setOpen(false);
                        }}
                        sx={{ mb: 3, mt: 4, background: red[400], display: 'block', mx: 'auto' }}>
                        Entendido
                    </ButtonFilled>
                </Box>
            </Dialog >
        </>


    );
}