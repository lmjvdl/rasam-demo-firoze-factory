"use client";
import { ColorSystemOptions, createTheme } from "@mui/material/styles";

const lightObject: ColorSystemOptions = {
  palette: {
    primary: {
      main: "#0FBDA2",
      
    },
    secondary: {
      main: "#E7F8F6",
    },
    background: {
      default: "#F7F7F7",
      defaultChannel: "#FFFFFF",
    },
  },
};
const darkObject: ColorSystemOptions = {
  palette: {
    primary: {
      main: "#0FBDA2",
    },
    secondary: {
      main: "#6A6A6A",
    },
    background: {
      default: "#2E2E2E",
      defaultChannel: "#333333",
    },
  },
};
const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "class", // or 'data'
  },

  direction: "rtl",
  colorSchemes: {
    light: lightObject,
    dark: darkObject,
  },
  shape:{borderRadius:6},
  typography: {
    fontFamily: "vazir",
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: {
          variants: [
            {
              props: { variant: "contained" },
              style: {
                color: "var(--mui-palette-common-white)",
              },
            },
          ],
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorDefault: "#fff",
      },
      defaultProps: {
        color: "default",
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
  },
});

export default theme;
