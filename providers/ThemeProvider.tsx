'use client';
import { createTheme, CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { indigo, grey, red } from '@mui/material/colors';
import 'dayjs/locale/es-mx';

function ThemeProviderCustom({ children }: any) {
    const theme = createTheme({
        palette: {
            mode: 'light',
            background: { default: '#fff', paper: '#fff' },
            primary: { main: indigo[600] },
            text: { primary: grey[800], secondary: indigo[400], disabled: grey[500] },
            divider: indigo[200],
            error: { main: red[600] },
            action: { disabled: grey[200] }
        }
    })
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles
                styles={{
                    '.ql-formats': {
                        backgroundColor: '#fff',
                        borderRadius: "8px"
                    },
                }}
            />
            {children}
        </ThemeProvider>
    );
}

export default ThemeProviderCustom;