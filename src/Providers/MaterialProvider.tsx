import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import Rtl from "./CacheProvider";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ReactNode } from "react";
import theme from "@/theme";

const MaterialProvider = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <AppRouterCacheProvider options={{ key: "css" }} >
      <Rtl>
        <ThemeProvider theme={theme} disableTransitionOnChange>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </Rtl>
    </AppRouterCacheProvider>
  );
};

export default MaterialProvider;
