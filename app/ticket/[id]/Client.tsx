'use client';
import { Grid } from '@mui/material';
import { Ticket } from '@prisma/client';
import { Bold, H1Bold, Normal } from '@/app/componentes/Letras';
import { ButtonFilled, ButtonOutline, ChipBox } from '@/app/componentes/Cajas';
import { FaRegClock } from 'react-icons/fa6';
import { MdOutlineKeyboardArrowLeft, MdOutlineLocationOn } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/componentes/Navbar';
import { QRCode } from 'react-qrcode-logo';
import { CgEye } from 'react-icons/cg';
interface Props {
    Ticket: Ticket;
}
export default function Client({ Ticket }: Props) {
    const router = useRouter();
    return (
        <>
            <Navbar />
            <Grid container my={4} px={2}>
                <Grid item xs={12}>
                    <ButtonOutline onClick={() => router.back()} startIcon={<MdOutlineKeyboardArrowLeft />}>
                        Regresar
                    </ButtonOutline>
                </Grid>
                <Grid item xs={7} mx='auto' >
                    <H1Bold sx={{ mb: 2, textAlign: 'center' }}>
                        Ticket Disponible
                    </H1Bold>
                    <QRCode style={{ borderRadius: 16, width: 200, height: 200, margin: '0 auto', display: 'block' }} value={`${window.location.hostname}/ticket/${Ticket.codigo}`} />
                    <Normal>
                        <b>Código: </b>{Ticket.codigo}
                    </Normal>
                    <Normal>
                        <b>A nombre de: </b>{Ticket.nombre || 'Anónimo'}
                    </Normal>
                </Grid>
                <Grid xs={6} mx='auto' mt={6}>
                    <ButtonFilled
                        onClick={() => {
                            router.push('/rifa/' + Ticket.rifaId)
                        }}
                        fullWidth endIcon={<CgEye />}>Ver Rifa</ButtonFilled>
                </Grid>
            </Grid>
        </>


    );
}