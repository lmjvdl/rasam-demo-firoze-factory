import theme from "@/theme";
import { companyMap } from "@/utils/icons/iconsMenu";
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
  onClick, // Add onClick here
}: {
  text: string;
  icon: ReactNode;
  link: string;
  onClick?: () => void;
}) => {
  return (
    <ListItem key={text} disablePadding>
      <ListItemButton LinkComponent={Link} href={link} onClick={onClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText
          primary={text}
          slotProps={{
            primary: {
              fontSize: "16px"
            }
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};


export default DrawerItem;
