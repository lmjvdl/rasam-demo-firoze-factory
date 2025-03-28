import theme from "@/styles/theme";
import { Done } from "@mui/icons-material";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useColorScheme,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import React, { ReactNode } from "react";

const SidebarItem = ({
  text = "داشبورد",
  link = "/dashboard",
  icon = <Done />,
  onClick,
  sx,
  selected = false,
}: {
  text: string;
  icon: ReactNode;
  link: string;
  onClick?: () => void;
  sx?: object;
  selected?: boolean;
}) => {
  const mode = useColorScheme(); 
  return (
    <ListItem key={text} disablePadding sx={sx}>
      <ListItemButton
        LinkComponent={Link}
        href={link.startsWith("/") ? link : `/${link}`}
        onClick={onClick}
        sx={{
          marginX: selected ? "8px" : "0px",
          borderRadius: "8px",
          backgroundColor: selected
            ? "var(--mui-palette-background-enable)"
            : "transparent",
          color: selected ? "#fff" : "inherit",
          "&:hover": {
            backgroundColor: selected
              ? "var(--mui-palette-primary-dark)"
              : "rgba(0, 0, 0, 0.2)",
          },
          paddingLeft: "8px",
          paddingRight: "8px",
          position: "relative",
          "&::after": selected
            ? {
                content: '""',
                position: "absolute",
                left: "-6px",
                top: "4px",
                bottom: "4px",
                width: "3px",
                backgroundColor: "var(--mui-palette-background-enable)",
                borderRadius: "0 2px 2px 0",
              }
            : {},
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: "32px",
            color: selected && (mode.colorScheme === "light") ? "#333333" : "inherit"
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={text}
          primaryTypographyProps={{
            fontSize: "14px",
            fontWeight: selected ? "bold" : "normal",
            color: selected && (mode.colorScheme === "light") ? "#333333" : "inherit"
          }}
          sx={{
            marginRight: "0",
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default SidebarItem;
