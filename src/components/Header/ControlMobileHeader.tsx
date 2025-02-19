import { Box, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { IconCalendar } from "@tabler/icons-react";
import CurrentDay from "./CurrentDay";

export default function ControlMobileHeader({setMobileOpen, mobileOpen}: 
    {setMobileOpen: Dispatch<SetStateAction<boolean>>;
         mobileOpen: boolean;}) {
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
      };
    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <IconCalendar stroke={1} />
        <Typography sx={{ paddingLeft: "10px" }}>{CurrentDay}</Typography>
      </Box>
    )
}