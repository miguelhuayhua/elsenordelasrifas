'use client';
import { Box, Divider, Grid } from "@mui/material";
import Image from "next/image";
import { H1Bold } from "./componentes/Letras";
import RifaBox from "./componentes/entidades/Rifa";
import { useEffect, useState } from "react";
import { Rifa } from "@prisma/client";
import axios from 'axios';
export default function Home() {
  const [Rifas, setRifas] = useState<Rifa[]>([]);
  useEffect(() => {
    axios.post('/api/rifa/todo').then(res => {
      setRifas(res.data);
    })
  }, []);
  return (
    <>
      <Box px={{ xs: 1, sm: 5 }}>
        <Box mx='auto' display='flex' justifyContent='center'>
          <Image src='/senorrifa.png' width={120} height={100} alt="logo señor de la rifa" />
        </Box>
        <Divider orientation='horizontal' />
        <H1Bold my={4} textAlign='center'>Siguientes sorteos</H1Bold>
        <Grid container spacing={5}>
          {
            Rifas.map(rifa => (
              <Grid key={rifa.id} item xs={6} sm={4} md={3} lg={2}>
                <RifaBox Rifa={rifa as any} />
              </Grid>
            ))
          }
        </Grid>
      </Box>

    </>
  );
}
