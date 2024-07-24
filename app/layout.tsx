import './globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { NextAuthProvider } from '@/providers/AuthProvider';
import DatePickerProvider from '@/providers/DatePickerProvider';
import { EdgeStoreProvider } from '@/providers/EdgeStoreProvider';
import ThemeProviderCustom from '@/providers/ThemeProvider';
import ModalBienvenida from './ModalBienvenida';
export default function RootLayout({ children }: any) {
  return (
    <html lang="es" >
      <body>
        <NextAuthProvider>
          <ThemeProviderCustom>
            <AppRouterCacheProvider>
              <EdgeStoreProvider>
                <DatePickerProvider>
                  {children}
                  <ModalBienvenida />
                </DatePickerProvider>
              </EdgeStoreProvider>
            </AppRouterCacheProvider>
          </ThemeProviderCustom>

        </NextAuthProvider>
      </body>
    </html>
  )
}
