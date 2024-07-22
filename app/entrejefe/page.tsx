'use client';
import { Box, CircularProgress, IconButton, useTheme } from "@mui/material";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Controller, useForm } from "react-hook-form";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import React from 'react';
import { useRouter } from "next/navigation";
import { TiUserOutline } from "react-icons/ti";
import { H1Bold } from "../componentes/Letras";
import { ButtonFilled, ButtonSimple, InputBox } from "../componentes/Cajas";

export default function Home() {
    const [showPassword, setShowPassword] = React.useState(false);
    //controlador de eventos para el submit
    const { handleSubmit, control, formState: { errors } } = useForm<{ usuario: string, password: string }>({
        defaultValues: { usuario: '', password: '' }
    });



    return (

        <Box px={{ xs: 1, md: 5, lg: 10, xl: 20 }} mt={5}>
            <H1Bold sx={{ textAlign: 'center' }}>
                Ingresa tus credenciales
            </H1Bold>
            <Box
                component={'form'}
                onSubmit={handleSubmit((data) => {
                    signIn('credentials', { redirect: true, callbackUrl: '/admin', ...data })
                })}
            >
                <Controller
                    rules={{ required: 'No puede quedar vacio' }}
                    control={control}
                    name="usuario"
                    render={({ field }) => (
                        <InputBox
                            variant="standard"
                            label='Usuario / Correo Electrónico'
                            error={!!errors.usuario}
                            {...field}
                            helperText={errors.usuario?.message}
                            InputProps={{ endAdornment: <TiUserOutline style={{ marginRight: 5 }} fontSize={25} /> }}
                        />
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    rules={{ required: 'No puede quedar vacío' }}
                    render={({ field }) => {
                        return (
                            <InputBox
                                variant="standard"
                                error={!!errors.password}
                                label='Contraseña'

                                type={showPassword ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment:
                                        <ButtonSimple
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <MdVisibilityOff fontSize={20} /> : <MdVisibility fontSize={20} />}
                                        </ButtonSimple>
                                }}
                                helperText={errors.password?.message}
                                {...field}
                            />
                        )
                    }}
                />
                <ButtonFilled
                    type="submit"
                    sx={{ mx: 'auto', display: 'block' }}
                >
                    Acceder
                </ButtonFilled>
            </Box>
        </Box>

    );
}