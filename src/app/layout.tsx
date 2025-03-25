"use client";

import Providers from "@/providers/Providers";
import "../styles/globals.css";
import { vazir } from "../../public/fonts/Fonts";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Header, { drawerWidth } from "@/components/header/Header";
import { Box, Stack } from "@mui/material";
import Sidebar from "@/components/sidebar/Sidebar";
import { useAuthStore } from "@/hooks/context/authStore";
import { ToastProvider } from "@/components/notification/ToastProvider";
// import ErrorPage from "@/components/errorHandler/errorPage";
import { ErrorBoundary } from "react-error-boundary";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const pathname = usePathname();

  const isLoginPage = pathname === "/login";

  return (
    <html lang="fa" dir="rtl" className={`${vazir.variable} font-sans`}>
      <head>
        <title>RasamIoT</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta
          name="description"
          content="Factory data monitoring and reporting"
        />
        <meta
          name="keywords"
          content="Rasam, Factory, Menhaj, Monitoring, Reporting, IoT, 
          Yazd, رسام, منهاج, یزد, کارخانه کاشی یزد, مانیتورینگ کارخانه کاشی, اینترنت اشیا"
        />
        <meta name="author" content="Rasam company" />
        <meta charSet="UTF-8" />
        <meta
          name="copyright"
          content="© همه حقوق برای شرکت رسام محفوظ است rasamiot.com"
        />
      </head>
      <body>
        {/* <ErrorBoundary FallbackComponent={ErrorPage}> */}
          <React.StrictMode>
            <Providers>
              <ToastProvider />
              {isLoginPage ? (
                <Box component="main" width="100%" height="100%">
                  {children}
                </Box>
              ) : (
                <Stack
                  direction={"row"}
                  width={"100%"}
                  height={"100%"}
                  bgcolor={"background.default"}
                >
                  <Sidebar
                    mobileOpen={mobileOpen}
                    setMobileOpen={setMobileOpen}
                    isAdmin={isAdmin}
                  />
                  <Stack
                    width={"100%"}
                    height={"calc(100% - 64px)"}
                    component="main"
                    sx={{
                      width: { sm: `calc(100% - ${drawerWidth}px)` },
                      flexGrow: 1,
                      mt: "64px",
                    }}
                  >
                    <Header
                      mobileOpen={mobileOpen}
                      setMobileOpen={setMobileOpen}
                      isAdmin={isAdmin}
                    />
                    <Box
                      component={"main"}
                      width={"100%"}
                      height={"100%"}
                      sx={{ flexGrow: 1, p: 2 }}
                    >
                      {children}
                    </Box>
                  </Stack>
                </Stack>
              )}
            </Providers>
          </React.StrictMode>
        {/* </ErrorBoundary> */}
      </body>
    </html>
  );
}