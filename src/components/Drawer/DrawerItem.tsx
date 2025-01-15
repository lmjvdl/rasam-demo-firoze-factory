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
}: {
  text: string;
  icon: ReactNode;
  link: string;
}) => {
  const FactoryIcon = companyMap["Setare"];
  return (
      <ListItem key={text} disablePadding>
        <ListItemButton LinkComponent={Link} href={link}>
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
