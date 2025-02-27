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
      {" "}
      {}
      <ListItemButton
        LinkComponent={Link}
        href={link.startsWith("/") ? link : `/${link}`}
        onClick={onClick}
        sx={{
          marginX: "3px",
          borderRadius: "8px",
          backgroundColor: selected ? "var(--mui-palette-primary-main)" : "transparent",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText
          primary={text}
          slotProps={{
            primary: {
              fontSize: "16px",
            },
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default SidebarItem;
