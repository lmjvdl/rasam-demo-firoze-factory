import { Done } from "@mui/icons-material";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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
  return (
    <ListItem key={text} disablePadding sx={sx}>
      <ListItemButton
        LinkComponent={Link}
        href={link.startsWith("/") ? link : `/${link}`}
        onClick={onClick}
        sx={{
          marginX: "3px",
          borderRadius: "8px",
          backgroundColor: selected 
            ? "var(--mui-palette-primary-main)" 
            : "transparent",
          color: selected 
            ? "#fff" 
            : "inherit",
          "&:hover": {
            backgroundColor: selected
              ? "var(--mui-palette-primary-dark)"
              : "rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <ListItemIcon sx={{ color: selected ? "#fff" : "inherit" }}>
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={text}
          primaryTypographyProps={{
            fontSize: "16px",
            fontWeight: selected ? "bold" : "normal",
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default SidebarItem;
