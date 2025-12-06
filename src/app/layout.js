// src/app/layout.js
import './globals.css';
import { Playfair_Display, Montserrat } from 'next/font/google';
import Script from 'next/script'; // Import komponen Script dari Next.js

// Konfigurasi Font Google Sheets
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-playfair',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-montserrat',
});

export const metadata = {
  title: 'Tampaksiring: Pusaka Alam dan Petualangan Abadi',
  description: 'Website Desa Wisata Tampaksiring',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        {/* PENTING: Import Font Awesome CSS (untuk styling dasar) */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" 
        />
        {/* PENTING: Import AOS CSS (Animasi Scroll) */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css" 
        />
      </head>
      <body className={`${playfair.variable} ${montserrat.variable}`}>
        {children}
        
        {/* PENTING: Solusi JS Font Awesome - Memuat skrip di akhir body */}
        {/* Komponen Script dari Next.js memastikan skrip dieksekusi dengan benar */}
        <Script 
            src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/js/all.min.js" 
            strategy="lazyOnload" // Memuat setelah halaman utama selesai
        />

      </body>
    </html>
  );
}