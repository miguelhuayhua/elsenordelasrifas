'use client';
import React, { createContext, useContext, useState } from 'react';
import { Snackbar, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
const SnackbarContext = createContext({
    openSnackbar: (message: string) => {
    }
});
export const SnackbarProvider = ({ children }: any) => {
    const [open, setOpen] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const theme = useTheme();
    const openSnackbar = (message: string) => {
        setMensaje(message);
        setOpen(true);
    };
    return (
        <SnackbarContext.Provider value={{ openSnackbar }}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={() => {
                    setOpen(false);
                }}
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