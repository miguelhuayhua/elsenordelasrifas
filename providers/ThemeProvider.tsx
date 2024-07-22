'use client';
import { createTheme, CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { purple, grey } from '@mui/material/colors';
import 'dayjs/locale/es-mx';

function ThemeProviderCustom({ children }: any) {
    const theme = createTheme({
        palette: {
            mode: 'light',
            background: { default: purple[900] },
            primary: { main: grey[50] },
            text: { primary: grey[50], secondary: grey[100] },
            common: { white: grey[50], black: grey[50] },
            divider: grey[50],
            error: { main: '#ff8888' }
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