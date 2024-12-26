"use client";
// import type { Metadata } from "next";
import DrawerSide from "@/components/Drawer/Drawer";
import { useState } from "react";
import AppbarComp, { drawerWidth } from "@/components/Appbar/Appbar";
import { Box, Stack } from "@mui/material";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  return (
    <Stack
      direction={"row"}
      width={"100%"}
      height={"100%"}
      bgcolor={"background.default"}
    >
      <DrawerSide mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <Stack
        width={"100%"}
        height={"calc (100% -64px) "}
        component="main"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          flexGrow: 1,
          mt: "64px",
        }}
      >
        <AppbarComp mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <Box
          component={"main"}
          width={"100%"}
          height={"100%"}
          sx={{
            flexGrow: 1,
            p: 2,
          }}
        >
          {children}
        </Box>
      </Stack>
    </Stack>
  );
}
