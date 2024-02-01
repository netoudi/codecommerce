import type { Metadata } from 'next';
import { Box, ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { Navbar } from '@/components/nav-bar';
import theme from '@/theme';

export const metadata: Metadata = {
  title: 'Codecommerce',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <div>
              <Navbar />
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  bgcolor: 'background.default',
                  mt: ['122px', '135px', '146px'],
                  p: 3,
                }}
              >
                {children}
              </Box>
            </div>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
