import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Box } from "@mui/material";
import { MenuProps } from "@/hooks/UI/globalStyleDropdown";

interface SingleDropDownProps {
  options: string[];
  onChange: (value: string) => void;
  placeholder: string;
} 

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function SingleSelect({placeholder, options, onChange}: SingleDropDownProps) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === "string" ? value.split(",") : value
    );
  };

    return (
      <Box sx={{ minWidth: 200 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-multiple-name-label">{placeholder}</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            value={personName}
            label={placeholder}
            onChange={handleChange}
            MenuProps={MenuProps}
          >
            {options?.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, personName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  }
