import { ThemeProvider } from '@/components/theme-provider';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { DarkVeilBackground } from '@/components/ui/shadcn-io/dark-veil-background';

import './global.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="h-full fixed w-full z-0">
            <DarkVeilBackground
              hueShift={45}
              scanlineIntensity={0.1}
              scanlineFrequency={2.0}
              noiseIntensity={0.05}
              warpAmount={1.0}
            />
          </div>
          <main className="relative z-10 min-h-screen">{children}</main>
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
