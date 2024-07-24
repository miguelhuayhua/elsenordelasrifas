'use client';
import { Box, Grid } from "@mui/material";
import { H1Bold } from "./componentes/Letras";
import RifaBox from "./componentes/entidades/Rifa";
import { useEffect, useState } from "react";
import { Rifa } from "@prisma/client";
import axios from 'axios';
import Navbar from "./componentes/Navbar";
export default function Home() {
  const [Rifas, setRifas] = useState<Rifa[]>([]);
  useEffect(() => {
    axios.post('/api/rifa/todo').then(res => {
      setRifas(res.data);
    })
  }, []);
  return (
    <>
      <Navbar />
      <Box px={{ xs: 1, sm: 5 }} py={5}>
        <H1Bold my={4} textAlign='center'>Siguientes sorteos</H1Bold>
        <Grid container spacing={2}>
          {
            Rifas.map(rifa => (
              <Grid key={rifa.id} mx='auto' item xs={6} sm={4} md={3} xl={2.5} >
                <RifaBox Rifa={rifa as any} />
              </Grid>
            ))
          }
        </Grid>
      </Box>
    </>
  );
}
