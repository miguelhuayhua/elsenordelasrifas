import { Box, Button, Checkbox, Chip, InputLabel, MenuItem, Select, Slider, Switch, TextField, styled } from "@mui/material";
import { amber, blueGrey, grey, red, indigo, pink } from "@mui/material/colors";
import { DatePicker, MobileTimePicker } from "@mui/x-date-pickers";

const BoxVertical = styled(Box)(() =>
({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 15,
}));
const BoxHorizontal = styled(Box)(() =>
({
    display: 'flex',
    alignItems: 'center',

}));


const BoxPaper = styled(Box)(({ theme }) =>
({
    borderRadius: "15px !important",
    overflow: 'hidden',
    border: `1px solid ${indigo[100]}`,
    background: grey[50]

}));

const CheckBox = styled(Checkbox)(() => {
    return {
        color: '#aaa',
        ":hover": { background: "#07192911" },
        '&.Mui-checked': { color: '#071929' },
        '& .MuiSvgIcon-root': { fontSize: 25 },
    }
});
const DatePickerBox = styled(DatePicker)(() => {
    return {
        marginBottom: 15,
        ":focus-visible": {
            outline: 'none !important'
        },
        width: "100%",
        ".MuiInputBase-root": {
            borderRadius: 0,
            fontSize: 13.5,
            fontFamily: 'inherit',
            fontWeight: 400,
            background: 'transparent',
            ":focus-visible": {
                outline: 'none !important'
            },
            '.MuiOutlinedInput-notchedOutline': {
                border: 'none',
                borderBottom: '1px solid #aaa'
            }
        },
        ".MuiFormLabel-root": {
            fontSize: 15,
            fontWeight: 400,
            fontFamily: 'inherit'
        },
        ".MuiTypography-root": {
            fontSize: 15,
            fontFamily: 'inherit',
            fontWeight: 700
        }
    }
});

const TimePickerBox = styled(MobileTimePicker)(() => {
    return {
        ":focus-visible": {
            outline: 'none !important'
        },
        margin: '10px 0',
        width: "100%",
        ".MuiInputBase-root": {
            borderRadius: 0,
            fontSize: 13.5,
            fontFamily: 'inherit',
            fontWeight: 400,
            background: 'transparent',
            ":focus-visible": {
                outline: 'none !important'
            },
            '.MuiOutlinedInput-notchedOutline': {
                border: 'none',
                borderBottom: '1px solid #aaa'
            }

        },
        ".MuiFormLabel-root": {
            fontSize: 15,
            fontWeight: 400,
            fontFamily: 'inherit'
        },
        ".MuiTypography-root": {
            fontSize: 15,
            fontFamily: 'inherit'
        }
    }
});
const InputBox = styled(TextField)(() => {
    return {
        marginBottom: 15,
        width: "100%",
        ".MuiInputBase-root": {
            fontFamily: 'inherit',
            fontWeight: 500,
            "&::before": {
                borderColor: indigo[400]
            }
        },
        ".MuiFormLabel-root": {
            fontWeight: 700,
            color: indigo[400]
        }
    }
});
const InputLabelStyled = styled(InputLabel)(() => {
    return {
        fontFamily: 'inherit',
        fontSize: 14,
        fontWeight: 700
    }
});
const MenuItemStyled = styled(MenuItem)(() => {
    return {
        fontSize: 13,
        overflow: 'hidden',
        fontFamily: 'inherit',
        display: 'flex !important',
        fontWeight: 600,
        '&.Mui-selected': { fontWeight: 700 },
        "&.MuiMenuItem-root": {
            borderRadius: 7,
            marginTop: "5px !important"
        }
    }
});

const ButtonFilled = styled(Button)(({ theme }) => {
    return {
        fontWeight: 600,
        fontSize: 16,
        minWidth: 0,
        borderRadius: 18,
        background: indigo[400], color: grey[50], "&:hover": { background: indigo[300] },
        textTransform: 'none'
    }
});

const ButtonOutline = styled(Button)(({ theme }) => {
    return {
        fontSize: 14,
        borderRadius: 18,
        color: red[400],
        border: `1px solid ${red[50]}`,
        textTransform: 'none',
        fontWeight: 600,
        minWidth: 0,
    }
});


const ChipBox = styled(Chip)(({ theme }) => ({
    borderRadius: 7,
    padding: "0",
    height: 22,
    minWidth: 0,
    background: 'white',
    border: `1px solid ${indigo[300]}`,
    fontSize: 14,
    marginBottom: 8
}));
const SwitchStyled = styled(Switch)(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: red[400],
                opacity: 1,
                border: 0,
            }
        },

        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        width: 22,
        height: 22,
        background: theme.palette.mode == 'light' ? grey[50] : grey[900]
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[600],
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },

}));

const ButtonSimple = styled(Button)(({ theme }) => {
    return {
        fontWeight: 600,
        color: grey[50],
        minWidth: 0,
        textTransform: 'none',
        border: 'none',
        borderRadius: 10,
        "&:hover": {
            color: indigo[500]
        }
    }
});

export {
    BoxPaper,
    InputBox,
    InputLabelStyled,
    MenuItemStyled,
    BoxVertical,
    BoxHorizontal,
    ButtonFilled,
    ButtonOutline,
    ButtonSimple,
    SwitchStyled,
    CheckBox,
    DatePickerBox,
    TimePickerBox,
    ChipBox
};

