'use client';
import { Box, Dialog, Stack } from '@mui/material';
import React, { ReactElement, createContext, useContext, useState } from 'react';
import { useSnackbar } from './SnackBarProvider';
import { useRouter } from 'next/navigation';
import { Bold, Normal } from '@/app/componentes/Letras';
import { ButtonFilled, ButtonOutline } from '@/app/componentes/Cajas';
import axios from 'axios';
import { grey } from '@mui/material/colors';

// Creamos un contexto para almacenar el estado del Snackbar
const ModalContext = createContext({
    openModal: (
        params: {
            content: ReactElement | string,
            url?: string,
            data?: any,
            titulo: string,
            ButtonText?: { yes: string, no: string },
            hasBack?: boolean;
            callback?: Function,
            replace?: string
        }
    ) => {
    }
});
export const ModalProvider = ({ children }: any) => {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const { openSnackbar } = useSnackbar();
    const [action, setAction] = useState<{
        params: {
            content: ReactElement | string,
            url?: string,
            data?: any,
            titulo: string,
            ButtonText?: { yes: string, no: string },
            hasBack?: boolean,
            callback?: Function,
            replace?: string
        }
    }>({
        params:
        {
            content: <></>,
            url: '',
            data: {},
            titulo: '',
            ButtonText: { yes: 'Aceptar', no: 'Cancelar' },
            hasBack: false,
            callback: () => { },
            replace: ''
        }
    });
    const openModal = (
        params:
            {
                content: ReactElement | string,
                url?: string,
                data?: any,
                titulo: string,
                ButtonText?: { yes: string, no: string },
                hasBack?: boolean,
                callback?: Function,
                replace?: string
            } = { ...action.params }
    ) => {
        setAction({
            params: {
                ...params,
                ButtonText: params.ButtonText ?
                    params.ButtonText : { no: 'Cancelar', yes: 'Aceptar' }
            }
        });
        setOpen(true);
    };

    return (
        <ModalContext.Provider value={{ openModal }}>
            {children}
            <Dialog
                onClose={() => setOpen(false)}
                open={open}
                aria-labelledby="Seleccione el producto"
                aria-describedby="Área de selección de productos para la generación de información"
                maxWidth={'xs'}
                sx={{
                    ".MuiPaper-root": {
                        zIndex: 100
                    }
                }}
            >
                <Box p={3} >
                    <Bold sx={{ color: grey[900], textAlign: 'center', mb: 1 }}>
                        {action.params.titulo}
                    </Bold>
                    {
                        typeof action.params.content == 'string' ?
                            <Normal sx={{ color: grey[900] }}>
                                {action.params.content}
                            </Normal>
                            : action.params.content
                    }
                    <Stack direction='row' justifyContent={'center'} spacing={3} mt={2}>
                        <ButtonFilled onClick={() => setOpen(false)}>
                            {action.params.ButtonText?.no}
                        </ButtonFilled>
                        <ButtonOutline
                            onClick={() => {
                                if (action.params.callback) {
                                    if (action.params.callback()) {
                                        setOpen(false);
                                        if (action.params.hasBack) {
                                            router.back();
                                        }
                                        router.refresh();
                                    }
                                }
                                else {
                                    const { data, url } = action.params;
                                    axios.post<{
                                        error: boolean,
                                        mensaje?: string
                                    }>(url!, data, {
                                        ...(data instanceof FormData && {
                                            headers: {
                                                'Content-Type': 'multipart/form-data',
                                            }
                                        })
                                    }).then((response) => {
                                        if (!response.data.error) {
                                            openSnackbar(response.data.mensaje!);
                                            setOpen(false);
                                            if (action.params.replace) {
                                                router.replace(action.params.replace);
                                                router.refresh();
                                            }
                                            else {
                                                if (action.params.hasBack) {
                                                    router.back();
                                                }
                                                router.refresh();
                                            }
                                        }
                                        else {
                                            openSnackbar(response.data.mensaje!);
                                            setOpen(false);
                                        }
                                    })

                                }
                            }}
                        >
                            {action.params.ButtonText?.yes}
                        </ButtonOutline>
                    </Stack>
                </Box>
            </Dialog>
        </ModalContext.Provider>
    );
};

// Hook para consumir el contexto del Snackbar en cualquier componente
export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal debe ser usado dentro de un ModalProvider');
    }

    return context;
};