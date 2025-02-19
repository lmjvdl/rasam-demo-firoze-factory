"use client";
// import type { Metadata } from "next";
import { useState } from "react";
import Header, { drawerWidth } from "@/components/Header/Header";
import { Box, Stack } from "@mui/material";
import Sidebar from "@/components/SideBar/Sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const isAdmin = true;

  return (
    <Stack
      direction={"row"}
      width={"100%"}
      height={"100%"}
      bgcolor={"background.default"}
    >
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} isAdmin={isAdmin}/>
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
        <Header mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} isAdmin={isAdmin}/>
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
