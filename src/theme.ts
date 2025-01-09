"use client";
import { faIR } from "@mui/material/locale";

type tableCustomPalleteOption = {
  header?: string;
  oddColumn?: string;
  evenColumn?: string;
};
declare module "@mui/material/styles" {
  interface Palette {
    table: tableCustomPalleteOption;
  }

  interface PaletteOptions {
    table: tableCustomPalleteOption;
  }
  interface TypeBackground {
    disable?: string;
    enable?: string;
  }
}

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
      defaultChannel: "#FFFFFF", //lighter
      disable: "#EDEDED",
    },
    table: {
      oddColumn: "#fff",
      evenColumn: "#F2F2F2",
      header: "#0C9782",
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
      defaultChannel: "#333333", //lighter
      disable: "#3A3A3A",
      enable: "#4C4C4C",
      paper: "#333333",
    },
    table: {
      header: "#0FBDA2",
      oddColumn: "#4C4C4C",
      evenColumn: "#646464",
    },
  },
};

const theme = createTheme(
  {
    cssVariables: {
      colorSchemeSelector: "class", // or 'data'
    },

    direction: "rtl",
    colorSchemes: {
      light: lightObject,
      dark: darkObject,
    },
    shape: { borderRadius: 8 },
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
      MuiAutocomplete: {
        styleOverrides: {
          inputRoot: {
            "&:not(.Mui-focused)": {
              flexWrap: "nowrap",
            },
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
        styleOverrides: {
          root: ({ theme }) => {
            return {
              "& fieldset": {
                borderWidth: "2px",
                borderColor: theme.palette.divider,
              },
            };
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: ({ theme }) => {
            return {
              "&:hover:not(.Mui-focused) .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.grey[400],
              },
            };
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            "& .Mui-active ": {
              borderWidth: "2px",
            },
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: ({ theme }) => {
            return {
              "&:nth-of-type(odd)": {
                backgroundColor: theme.palette.action.hover,
              },
              // hide last border
              "&:last-child td, &:last-child th": {
                border: 0,
              },
            };
          },
        },
      },
      MuiTableContainer: {
        styleOverrides: {
          root: {
            boxShadow: "none",
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: ({ theme }) => {
            return {
              backgroundColor: theme.palette.table.header,
              th: {
                color: theme.palette.common.white,
                fontWeight: "bold",
                ...theme.applyStyles("dark", {
                  color: theme.palette.common.black,
                }),
              },
            };
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 5,
          },
        },
      },
      MuiSelect: {
        defaultProps: {
          size: "small"
        },
        styleOverrides: {
          root: ({ theme }) => {
            return {
              "& fieldset": {
                borderWidth: "2px",
                borderColor: theme.palette.divider,
              },
            };
          },
        },
      },
      MuiInputLabel: {
        defaultProps: {
          size: "small"
        }
      }
      
    },
  },
  faIR
);

export default theme;
