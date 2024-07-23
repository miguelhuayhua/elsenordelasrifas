'use client';
import { Box, Divider, Grid, Stack } from "@mui/material";
import Image from "next/image";
import { H1Bold } from "./componentes/Letras";
import RifaBox from "./componentes/entidades/Rifa";
import { useEffect, useState } from "react";
import { Rifa } from "@prisma/client";
import axios from 'axios';
import ModalAyuda from "./rifa/[id]/ModalAyuda";
import { ButtonOutline } from "./componentes/Cajas";
import ModalHorario from "./rifa/[id]/ModalHorario";
import ModalUbicacion from "./rifa/[id]/ModalUbicacion";
import ModalReglas from "./rifa/[id]/ModalReglas";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import { LuRuler } from "react-icons/lu";
export default function Home() {
  const [Rifas, setRifas] = useState<Rifa[]>([]);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  useEffect(() => {
    axios.post('/api/rifa/todo').then(res => {
      setRifas(res.data);
    })
  }, []);
  return (
    <>
      <Box px={{ xs: 1, sm: 5 }} py={5}>
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
        <H1Bold my={4} textAlign='center'>Siguientes sorteos</H1Bold>
        <Grid container spacing={5}>
          {
            Rifas.map(rifa => (
              <Grid key={rifa.id} item xs={6} sm={4} md={3} >
                <RifaBox Rifa={rifa as any} />
              </Grid>
            ))
          }
        </Grid>
      </Box>

      <ModalAyuda open={open1} setOpen={setOpen1} />
      <ModalHorario open={open3} setOpen={setOpen3} />
      <ModalUbicacion open={open2} setOpen={setOpen2} />
      <ModalReglas open={open4} setOpen={setOpen4} />
    </>
  );
}
