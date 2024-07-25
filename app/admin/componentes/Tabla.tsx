'use client';
import Table from '@mui/material/Table';
import { TbDotsVertical } from "react-icons/tb";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, ClickAwayListener, Tooltip, useTheme } from '@mui/material';
import { BiSearch } from 'react-icons/bi';
import Image from 'next/legacy/image';
import { BsCursorFill } from "react-icons/bs"; import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa6';
import { MdEdit } from 'react-icons/md';
import React from 'react';
import { grey } from '@mui/material/colors';
import { ButtonOutline, ButtonSimple, ChipBox, InputBox } from '@/app/componentes/Cajas';
import { filtrarValorEnArray } from '@/app/utils/filtros';
import { Normal } from '@/app/componentes/Letras';
interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}


interface Props {
    hasPagination?: boolean;
    data: any[];
    take?: number;
    admin?: string;
    skip?: number;
    subtitle?: string;
    edit?: string;
    small?: boolean;
    onRow?: (item: any) => void | undefined;
    skipColumns?: { [key: string]: boolean };
    hasSearch?: boolean;
}
const Tabla = ({
    hasPagination = false,
    data,
    skip = 0,
    take = 10,
    edit = undefined,
    small = true,
    admin = undefined,
    onRow = undefined,
    skipColumns = {},
    hasSearch = true
}: Props) => {
    const [page, setPage] = useState(skip);
    const [Data, setData] = useState(data);
    const router = useRouter();
    const [open, setOpen] = useState<any>(null);
    const [rowsPerPage, setRowsPerPage] = useState(take);
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const theme = useTheme();
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    useEffect(() => {
        setData(data)
    }, [data]);

    let cols: Column[] = [];
    let keys = Data ? Data[0] ? Object.keys(Data[0]) : [] : [];
    keys.forEach((value => {
        if (value != 'id' && !skipColumns[value])
            cols.push({ id: value, label: value })
    }));
    return (
        <Box>

            {
                hasSearch ?
                    <Box my={2}>
                        <InputBox
                            sx={{
                                width: "30%",
                                minWidth: 200
                            }}
                            size='small'
                            onChange={(ev) => {
                                setData(filtrarValorEnArray(data, ev.target.value));
                            }}
                            placeholder='Buscar'
                            InputProps={{
                                endAdornment:
                                    <BiSearch fontSize={30} />
                            }}
                        />
                    </Box>
                    : null
            }
            <TableContainer sx={{ maxHeight: 700 }} >
                {
                    Data.length > 0 ?
                        <Table
                            size={small ? 'small' : 'medium'}
                            stickyHeader
                        >
                            <TableHead >
                                <TableRow key={'head'}>
                                    {cols.map((column) => {
                                        return (
                                            <TableCell
                                                style={{
                                                    textTransform: 'capitalize',
                                                    fontSize: 16,
                                                    fontWeight: 600,
                                                    border: 'none'
                                                }}
                                                key={column.label}
                                                align={'left'}
                                            >
                                                {column.label}
                                            </TableCell>
                                        );
                                    })}
                                    {
                                        admin || edit || onRow ?
                                            <TableCell
                                                style={{
                                                    textTransform: 'capitalize',
                                                    fontSize: 14.5,
                                                    fontWeight: 600,
                                                    color: '#637381',
                                                    border: 'none'
                                                }}
                                                align={'left'}
                                            >
                                            </TableCell>
                                            : null
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Data
                                    .slice(rowsPerPage! * page!, rowsPerPage! * page! + rowsPerPage!)
                                    .map((row, index) => {
                                        return (
                                            <TableRow hover key={index} >
                                                {cols.map((column) => {
                                                    let value = row[column.id];
                                                    if (React.isValidElement(value)) {
                                                        return (
                                                            <TableCell key={Math.random()}>
                                                                {value}
                                                            </TableCell>
                                                        );
                                                    }
                                                    else if (typeof value != 'object') {
                                                        return (
                                                            <TableCell key={Math.random()}>
                                                                {value}
                                                            </TableCell>
                                                        );
                                                    }
                                                })}
                                                {edit || admin || onRow ?
                                                    <TableCell>
                                                        <ClickAwayListener touchEvent={false} onClickAway={() => setOpen(null)}>
                                                            <Box>
                                                                <Tooltip
                                                                    arrow
                                                                    PopperProps={{
                                                                        sx: {
                                                                            "& .MuiTooltip-tooltip": {
                                                                                px: 0,
                                                                                borderRadius: 3,
                                                                                background: theme.palette.mode == 'light' ? grey[50] : grey['900'],
                                                                                border: theme.palette.mode == 'light' ? '1px solid #ddd' : '1px solid #555'
                                                                            },
                                                                        }
                                                                    }}
                                                                    placement='left'
                                                                    disableFocusListener
                                                                    disableHoverListener
                                                                    disableTouchListener
                                                                    open={open == index}
                                                                    title={
                                                                        <Box p={0.25} minWidth={150}>
                                                                            {edit ?
                                                                                <ButtonSimple fullWidth onClick={() => router.push(`${edit}${row.id}`)} sx={{ display: 'flex', justifyContent: 'start' }} >
                                                                                    <MdEdit fontSize={20} style={{ marginRight: 10 }} /> Editar
                                                                                </ButtonSimple>
                                                                                : null
                                                                            }
                                                                            {admin ?
                                                                                <ButtonSimple fullWidth onClick={() => router.push(`${admin}${row.id}`)} sx={{ display: 'flex', justifyContent: 'start' }} >
                                                                                    <FaEye fontSize={20} style={{ marginRight: 10 }} /> Ver
                                                                                </ButtonSimple>
                                                                                : null
                                                                            }
                                                                            {onRow ?
                                                                                <ButtonSimple onClick={() => {
                                                                                    onRow!(row);
                                                                                    setOpen(null);
                                                                                }} sx={{ display: 'flex', justifyContent: 'start' }} >
                                                                                    <BsCursorFill /> Realizar acción
                                                                                </ButtonSimple>
                                                                                : null
                                                                            }
                                                                        </Box>
                                                                    }
                                                                >
                                                                    <ButtonOutline onClick={() => setOpen(index)}>
                                                                        <TbDotsVertical fontSize={18} />
                                                                    </ButtonOutline>
                                                                </Tooltip>
                                                            </Box>
                                                        </ClickAwayListener>
                                                    </TableCell>
                                                    : null
                                                }
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                        : <Box py={3}>
                            <Normal sx={{ textAlign: 'center' }}>
                                No hay datos disponibles
                            </Normal>
                        </Box>
                }
            </TableContainer >
            {
                hasPagination ?
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50]}
                        component="div"
                        count={Data.length
                        }
                        sx={{
                            fontSize: 12,
                            fontWeight: 600
                        }}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage='Filas'
                        labelDisplayedRows={
                            ({ count, from, page, to }) => {
                                return (`Página ${page + 1}`)
                            }
                        }
                    />
                    : null}
        </Box >
    )
}




export default Tabla;