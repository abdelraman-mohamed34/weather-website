import { ReduxProvider } from "./providers";
import ThemeInitializer from "./ThemeInitializer";
import './globals.css';
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script id="theme-script" strategy="beforeInteractive">
          {`
            (function() {
              try {
                const saved = localStorage.getItem('storageTheme') || 'light';
                if(saved === 'dark') {
                  document.documentElement.classList.add('dark');
                  document.body.classList.add('dark');
                }
              } catch(e) {}
            })();
          `}
        </Script>
      </head>
      <body>
        <ReduxProvider>
          <ThemeInitializer>
            {children}
          </ThemeInitializer>
        </ReduxProvider>
      </body>
    </html>
  );
}
