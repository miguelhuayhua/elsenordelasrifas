import { Box } from "@mui/material";
import Sidebar from "./componentes/Sidebar";
import { SnackbarProvider } from "@/providers/SnackBarProvider";
import { ModalProvider } from "@/providers/ModalProvider";
export default async function Layout({ children }: any) {
    return (
        <ModalProvider>
            <SnackbarProvider>
                <Box display='flex' justifyContent='center'>
                    <Box width={100} bgcolor='white' height="100vh">
                        <Sidebar />
                    </Box>
                    <Box width={"calc(100% - 100px)"} >
                        {children}
                    </Box>
                </Box>
            </SnackbarProvider>
        </ModalProvider>
    );
}
