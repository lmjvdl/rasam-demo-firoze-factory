import * as React from "react";
import { useTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Box } from "@mui/material";
import { getStyles, MenuProps } from "@/hooks/UI/globalStyleDropdown";

interface DeviceDropDownProps {
  options: string[];
  onChange: (value: string[]) => void;
  placeholder: string;
} 


export default function SingleSelect({placeholder, options, onChange}: DeviceDropDownProps) {
  const theme = useTheme();
  const [optionName, setOptionName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof optionName>) => {
    const {
      target: { value },
    } = event;
    setOptionName(
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
            value={optionName}
            multiple
            label={placeholder}
            onChange={handleChange}
            MenuProps={MenuProps}
          >
            {options?.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, optionName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  }
