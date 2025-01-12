import theme from "@/theme";
import { Done } from "@mui/icons-material";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import React, { ReactNode } from "react";

const DrawerItem = ({
  text = "داشبورد",
  link = "/dashboard",
  icon = <Done />,
}: {
  text: string;
  icon: ReactNode;
  link: string;
}) => {
  return (
    <ListItem key={text} disablePadding>
      <ListItemButton LinkComponent={Link} href={link}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText
          primary={text}
          slotProps={{
            primary: {
              fontSize: "20px"
            }
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default DrawerItem;
