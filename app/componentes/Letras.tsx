import { Typography, styled } from "@mui/material";
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
        fontWeight: 200,
        fontStyle: 'oblique',
        fontSize: 14,
        textAlign: 'center',
        margin: '10px 0',
    }
});
const H1Bold = styled(Typography)(({ theme }) => {
    return {
        fontWeight: 800,
        fontSize: 40,
    }
});
export { Normal, Small, Bold, H1Bold, Cursive };