import type { Metadata } from "next";
import localFont from "next/font/local";
import Providers from "@/Providers/Providers";
import "./globals.css";

const vazir = localFont({
  // 300 to 700 , bold
  src: [
    {
      path: "../../public/fonts/Vazir/Vazir-FD-WOL.woff",
      weight: "500",
    },
    {
      path: "../../public/fonts/Vazir/Vazir-Light-FD-WOL.woff",
      weight: "400",
    },

    {
      path: "../../public/fonts/Vazir/Vazir-Thin-FD-WOL.woff",
      weight: "300",
    },

    {
      path: "../../public/fonts/Vazir/Vazir-Medium-FD-WOL.woff",
      weight: "600",
    },
    {
      path: "../../public/fonts/Vazir/Vazir-Bold-FD-WOL.woff",
      weight: "700",
    },
  ],
  variable: "--font-vazir",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={`${vazir.variable} font-sans`}>
      <head>
        <title>RasamIoT</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="description" content="Factory data monitoring and reporting" />
        <meta name="keywords" content="ًRasam, Factory, Menhaj, Monitoring, Reporting, IoT, Yazd" />
        <meta name="author" content="Rasam company" />
        <meta charSet="UTF-8" />
        <meta name="copyright" content="© همه حقوق برای شرکت رسام محفوظ است rasamiot.com" />
      </head>

      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}


