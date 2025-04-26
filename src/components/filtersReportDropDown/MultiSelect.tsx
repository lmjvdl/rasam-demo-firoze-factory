// MultiSelect.tsx
import * as React from "react";
import { Box } from "@mui/material";
import AdvanceAutoComplete from "../autoComplete/AdvanceAutoComplete";
import { MultiSelectDropDownProps } from "@/interfaces/ui/inputs/DynamicInputs";

export default function MultiSelect({
  placeholder,
  options,
  onChange,
  value,
}: MultiSelectDropDownProps) {
  const handleChange = (newValue: string | string[]) => {
    onChange(Array.isArray(newValue) ? newValue : [newValue]);
  };

  return (
    <Box sx={{ minWidth: 200 }}>
      <AdvanceAutoComplete
        multiple={true}
        TFPlaceholder={placeholder}
        setValue={handleChange}
        stateOption={options}
        value={value || []}
      />
    </Box>
  );
}