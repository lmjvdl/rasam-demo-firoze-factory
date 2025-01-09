"use client";
import { Box, Container, useColorScheme } from "@mui/material";
import { IconMoon, IconSun } from "@tabler/icons-react";
import React, { useState } from "react";

export default function SwitchThemeBtn() {
  const { mode, setMode } = useColorScheme();
  const toggleTheme = () => {
    if (mode === "dark") {
      setMode("light");
    } else {
      setMode("dark");
    }
  };
  return (
    <Container>
      <Box onClick={toggleTheme}>
        {mode === "dark" ? <IconSun /> : <IconMoon />}
      </Box>
    </Container>
  );
}
