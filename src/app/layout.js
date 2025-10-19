import { ReduxProvider } from "./providers";
import ThemeInitializer from "./ThemeInitializer";
import './globals.css';
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script id="theme-script" strategy="beforeInteractive">
        {`
          (function() {
            try {
              const saved = localStorage.getItem('storageTheme') || 'light';
              const isDark = saved === 'dark';
              if(isDark){
                document.documentElement.classList.add('dark');
                document.body.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
                document.body.classList.remove('dark');
              }
            } catch(e) {}
          })();
        `}
      </Script>
      <body>
        <ReduxProvider>
          <ThemeInitializer>
            {children}
          </ThemeInitializer>
        </ReduxProvider>
      </body>
    </html>
  )
}
