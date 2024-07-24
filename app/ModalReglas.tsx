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
                                Los participantes ganadores deben confirmar su ticket una vez elegidos,
                                caso contrario no se podrá realizar la entrega en fechas acordadas.
                            </Normal>
                        </li>
                        <li>
                            <Normal>
                                Nos basamos en probabilidades aleatorias, tienes mayor probabilidad de ganar mientras
                                más tickets tengas.
                            </Normal>
                        </li>
                        <li>
                            <Normal>
                                Puedes solicitar reembolsos <b>antes de que inicie el juego</b> en tickets con valor a 5 bolivianos
                                para arriba.
                            </Normal>
                        </li>
                        <li>
                            <Normal>
                                El señor de la rifa te garantiza tu premio cuando hayas confirmado la fecha específica para el recojo del premio.
                            </Normal>
                        </li>
                        <li>
                            <Normal>
                                Los tickets solo podrán ser validados solo a través de la página del <b>señor de la rifa</b> mediante el QR o código que se te haya
                                asignado.
                            </Normal>
                        </li>
                    </ul>
                </Box>
            </Dialog >
        </>


    );
}