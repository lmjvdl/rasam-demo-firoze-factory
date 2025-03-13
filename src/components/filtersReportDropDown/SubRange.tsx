import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Box } from "@mui/material";
import { getStyles, MenuProps } from "@/hooks/ui/globalStyleDropdown";
import { SubRangeDropDownProps } from "@/interfaces/ui/inputs/DynamicInputs";

export default function SubRange({ options, onChange}: SubRangeDropDownProps) {
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
          <InputLabel id="demo-multiple-name-label">زیر بازه</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            value={optionName}
            label="زیر بازه"
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
