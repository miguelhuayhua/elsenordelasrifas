import { Typography, styled } from "@mui/material";
import { amber, indigo } from "@mui/material/colors";
const Normal = styled(Typography)(({ theme }) => {
    return {
        fontWeight: "300",
        fontSize: 15,
    }
});
const Small = styled(Typography)(({ theme }) => {
    return {
        fontWeight: 100,
        fontSize: 12,
    }
});

const Bold = styled(Typography)(({ theme }) => {
    return {
        fontWeight: 700,
        fontSize: 15,
    }
});
const Cursive = styled(Typography)(() => {
    return {
        fontStyle: 'oblique',
        fontSize: 15,
        textAlign: 'center',
        margin: '10px 0',
    }
});
const H1Bold = styled(Typography)(({ theme }) => {
    return {
        fontWeight: 800,
        fontSize: 30,
        color: indigo[500]

    }
});
export { Normal, Small, Bold, H1Bold, Cursive };