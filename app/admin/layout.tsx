import { Box } from "@mui/material";
import Sidebar from "./componentes/Sidebar";
import { SnackbarProvider } from "@/providers/SnackBarProvider";
import { ModalProvider } from "@/providers/ModalProvider";
export default async function Layout({ children }: any) {
    return (
        <ModalProvider>
            <SnackbarProvider>
                <Box display='flex' justifyContent='center'>
                    <Sidebar />
                    <Box width={{ xs: "100%", sm: '  "calc(100% - 90px)"' }} >
                        {children}
                    </Box>
                </Box>
            </SnackbarProvider>
        </ModalProvider>
    );
}
