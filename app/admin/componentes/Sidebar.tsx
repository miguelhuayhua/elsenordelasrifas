'use client';
import { ButtonFilled } from "@/app/componentes/Cajas";
import { Box, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { FaBox, FaTag } from "react-icons/fa6";
export default function Sidebar() {
    const router = useRouter();
    return (
        <Stack spacing={1} pt={2}>
            <ButtonFilled fullWidth onClick={() => {
                router.push('/admin/rifa')
            }} sx={{ flexDirection: 'column' }}>
                <FaTag fontSize={30} />
                Rifas
            </ButtonFilled>
            <ButtonFilled fullWidth onClick={() => {
                router.push('/admin/producto')
            }} sx={{ flexDirection: 'column' }}>
                <FaBox fontSize={30} />
                Productos
            </ButtonFilled>
        </Stack>

    )
}