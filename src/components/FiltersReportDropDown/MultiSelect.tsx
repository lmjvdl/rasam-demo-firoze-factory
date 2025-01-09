import * as React from "react";
import { useTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Box } from "@mui/material";
import { getStyles, MenuProps } from "@/hooks/UI/globalStyleDropdown";
import AdvanceAutoComplete from "../Autocomplete/AdvanceAutoComplete";

interface DeviceDropDownProps {
  options: string[];
  onChange: (value: string[]) => void;
  placeholder: string;
  value: Array<string | object>;
}

export default function SingleSelect({
  placeholder,
  options,
  onChange,
  value,
}: DeviceDropDownProps) {
  return (
    <Box sx={{ minWidth: 200 }}>
      {/* <FormControl fullWidth>
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
      </FormControl> */}
      <AdvanceAutoComplete
        multiple={true}
        TFPlaceholder={placeholder}
        setValue={onChange}
        stateOption={options}
        value={value || ""}
      />
    </Box>
  );
}
