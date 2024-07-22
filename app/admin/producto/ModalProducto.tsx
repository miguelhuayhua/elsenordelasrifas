'use client';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Box } from '@mui/material';
import { IoMdCamera } from "react-icons/io";
import { Controller, useForm } from 'react-hook-form';
import { useModal } from '@/providers/ModalProvider';
import { useSnackbar } from '@/providers/SnackBarProvider';
import { Producto } from '@prisma/client';
import { H1Bold, Small } from '@/app/componentes/Letras';
import { BoxPaper, BoxVertical, ButtonFilled, ButtonSimple, InputBox } from '@/app/componentes/Cajas';
import { parsePhone, toUpperCase } from '@/app/utils/filtros';
import Image from 'next/image';
import { useFilePicker } from "use-file-picker";
import { useEdgeStore } from '@/providers/EdgeStoreProvider';
import { amber, grey, purple } from '@mui/material/colors';
import axios from 'axios';
import { useRouter } from 'next/navigation';
interface Props {
    open: boolean;
    setOpen: any;
}
export default function ModalProducto({ setOpen, open }: Props) {
    const { openModal } = useModal();
    const { openSnackbar } = useSnackbar();
    const router = useRouter();
    const { control, handleSubmit, formState: { errors }, watch, setValue } = useForm<Producto>({
        defaultValues: {
            nombre: '',
            imagen: ''
        }
    });
    const onSubmit = (Producto: Producto) => {
        openModal({
            titulo: '¿Continuar?',
            content: 'Se agregará nuevo Producto',
            callback() {
                axios.post('/api/producto/crear', Producto).then(res => {
                    openSnackbar(res.data.mensaje);
                    if (!res.data.error) {
                        setOpen(false);
                        router.refresh();
                    }
                })
                return true;
            }
        });
    }
    const { edgestore } = useEdgeStore();

    const logoZone = useFilePicker({
        readAs: 'DataURL',
        accept: 'image/*',
        multiple: false,
        onFilesSuccessfullySelected: ({ plainFiles }) => {
            edgestore.publicFiles.upload({
                file: plainFiles[0],
                options: { temporary: true }
            }).then(response => {
                setValue('imagen', response.url);
            })
        }
    });
    return (
        <>
            <Dialog
                open={open}
                keepMounted={false}
                maxWidth='md'
                fullWidth
                PaperProps={{ sx: { borderRadius: 4, background: purple[900], backgroundImage: 'none' } }}
                onClose={() => { setOpen(false) }}
            >
                <Box p={2} component='form' onSubmit={handleSubmit(onSubmit)}>
                    <H1Bold sx={{ fontSize: 22 }} mb={2}>
                        Añadir Producto
                    </H1Bold>
                  
                    <BoxPaper mb={2} width={200} height={200} mx='auto'>
                        <ButtonSimple sx={{ height: "100%", width: "100%" }} onClick={() => logoZone.openFilePicker()}>
                            <Image alt='' src={watch('imagen') ? watch('imagen')! : '/default-profile.jpg'} layout="fill" objectFit="cover" />
                            <BoxVertical>
                                <IoMdCamera fontSize={30} color={amber[900]} />
                                <span style={{ color: amber[900], fontSize: 10.5 }}>Subir Imagen</span>
                            </BoxVertical>
                        </ButtonSimple>
                    </BoxPaper>
                    <Controller
                        name={"nombre"}
                        control={control}
                        rules={{ required: 'Nombre es requerido' }}
                        render={({ field: { ref, ...field } }) => (
                            <InputBox
                                {...field}
                                inputRef={ref}
                                label='Nombre del producto'
                                variant='standard'
                                helperText={errors.nombre?.message}
                                error={!!errors.nombre}
                                onChange={ev => field.onChange(toUpperCase(ev.target.value))}
                            />
                        )}
                    />
                    <ButtonFilled
                        sx={{ float: 'right' }} type='submit'>
                        Guardar cambios
                    </ButtonFilled>
                </Box>
            </Dialog >
        </>


    );
}