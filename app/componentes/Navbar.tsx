'use client';
import { Box, Link, Stack } from "@mui/material";
import ModalAyuda from "../ModalAyuda";
import ModalHorario from "../ModalHorario";
import ModalReglas from "../ModalReglas";
import ModalUbicacion from "../ModalUbicacion";
import { ButtonFilled, ButtonOutline } from "./Cajas";
import Image from "next/legacy/image";
import { LuRuler } from "react-icons/lu";
import { FaRegClock } from 'react-icons/fa6';
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { MdOutlineLocationOn } from "react-icons/md";
import { useState } from "react";
import { BsWhatsapp } from "react-icons/bs";
export default function Navbar() {
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    return (
        <>
            <Box mx='auto' display='flex' justifyContent='center'>
                <Image src='/senordelasrifas.png' width={220} height={200} alt="logo señor de la rifa" />
            </Box>
            <Stack direction='row' spacing={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                <ButtonOutline onClick={() => setOpen1(true)}>
                    <AiOutlineQuestionCircle fontSize={40} />
                </ButtonOutline>
                <ButtonOutline onClick={() => setOpen2(true)}>
                    <MdOutlineLocationOn fontSize={40} />
                </ButtonOutline>
                <ButtonOutline onClick={() => setOpen3(true)}>
                    <FaRegClock fontSize={35} />
                </ButtonOutline>
                <ButtonOutline onClick={() => setOpen4(true)}>
                    <LuRuler fontSize={35} />
                </ButtonOutline>
            </Stack>
            <Link href='https://chat.whatsapp.com/BcpN3rDlRn7InCpdMMUTIQ' target='_blank'>
                <ButtonFilled sx={{ mx: 'auto', display: 'flex', mt: 2 }} startIcon={<BsWhatsapp />}>
                    Accede a nuestro grupo
                </ButtonFilled>
            </Link>

            <ModalAyuda open={open1} setOpen={setOpen1} />
            <ModalHorario open={open3} setOpen={setOpen3} />
            <ModalUbicacion open={open2} setOpen={setOpen2} />
            <ModalReglas open={open4} setOpen={setOpen4} />
        </>
    )
}