//providers
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { NextAuthProvider } from '@/providers/AuthProvider';
import DatePickerProvider from '@/providers/DatePickerProvider';
import { EdgeStoreProvider } from '@/providers/EdgeStoreProvider';
import ThemeProviderCustom from '@/providers/ThemeProvider';
import { Montserrat } from 'next/font/google';
const montserrat = Montserrat({ subsets: ['latin'] });
export default function RootLayout({ children }: any) {
  return (
    <html lang="es" className={montserrat.className} >
      <body>
        <NextAuthProvider>
          <ThemeProviderCustom>
            <AppRouterCacheProvider>
              <EdgeStoreProvider>
                <DatePickerProvider>
                  {children}
                </DatePickerProvider>
              </EdgeStoreProvider>
            </AppRouterCacheProvider>
          </ThemeProviderCustom>

        </NextAuthProvider>
      </body>
    </html>
  )
}
