'use client';
import { ButtonFilled, ButtonOutline, ButtonSimple } from "@/app/componentes/Cajas";
import { Box, Stack, SwipeableDrawer, useMediaQuery, useTheme } from "@mui/material";
import { grey, purple } from "@mui/material/colors";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CgClose, CgMenuLeft } from 'react-icons/cg';
import { FaBox, FaTag } from "react-icons/fa6";
export default function Sidebar() {
    const router = useRouter();
    const theme = useTheme();
    const [move, setMove] = useState(false);
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const Side = () => (
        <Box
            sx={{
                position: md ? 'block' : 'sticky',
                height: "100vh", zIndex: 50,
                top: 0,
                width: md ? 100 : 90,
                px: 0.5
            }}
        >
            <Stack spacing={1} pt={2}>
                <ButtonOutline sx={{ fontSize: 13, flexDirection: 'column' }} fullWidth onClick={() => {
                    router.push('/admin/rifa')
                }} >
                    <FaTag fontSize={25} />
                    Rifas
                </ButtonOutline>
                <ButtonOutline sx={{ fontSize: 13, flexDirection: 'column' }} fullWidth onClick={() => {
                    router.push('/admin/producto')
                }} >
                    <FaBox fontSize={25} />
                    Productos
                </ButtonOutline>
            </Stack>
        </Box>
    )
    return (
        <>

            <ButtonOutline
                onClick={() => { setMove(!move); }}
                sx={{ position: 'fixed', top: 17, left: 15, zIndex: 20, display: { xs: 'block', md: 'none' } }}>
                <CgMenuLeft fontSize={27} />
            </ButtonOutline>
            {
                md ?
                    <SwipeableDrawer
                        anchor={'left'}
                        open={move}
                        onClose={() => {
                            setMove(false);
                        }}
                        onOpen={() => setMove(true)}
                    >
                        <Side />
                    </SwipeableDrawer>
                    :
                    <Side />
            }
        </>

    )
}