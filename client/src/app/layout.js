import './globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from './providers';
import Navbar from '@/components/Navbar';

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
            <Navbar/>
            {children}

        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
