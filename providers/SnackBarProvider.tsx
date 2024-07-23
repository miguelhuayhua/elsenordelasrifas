'use client';
import React, { createContext, useContext, useState } from 'react';
import { Snackbar } from '@mui/material';
import { grey, indigo } from '@mui/material/colors';
const SnackbarContext = createContext({
    openSnackbar: (message: string) => {
    }
});
export const SnackbarProvider = ({ children }: any) => {
    const [open, setOpen] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const openSnackbar = (message: string) => {
        setMensaje(message);
        setOpen(true);
    };
    return (
        <SnackbarContext.Provider value={{ openSnackbar }}>
            {children}
            <Snackbar
                ContentProps={{ sx: { background: indigo[400], } }}
                open={open}
                autoHideDuration={6000}
                onClose={() => {
                    setOpen(false);
                }}
                sx={{ color: grey[50] }}
                message={mensaje}
            />
        </SnackbarContext.Provider>
    );
};
export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar debe ser utilizado dentro de un SnackbarProvider');
    }

    return context;
};