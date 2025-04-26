// SingleSelect.tsx
import * as React from "react";
import { Box } from "@mui/material";
import AdvanceAutoComplete from "../autoComplete/AdvanceAutoComplete";
import { SingleDropDownProps } from "@/interfaces/ui/inputs/DynamicInputs";

export default function SingleSelect({
  placeholder,
  options,
  onChange,
  value,
}: SingleDropDownProps) {
  const handleChange = (newValue: string | string[]) => {
    // Ensure we only pass string
    onChange(typeof newValue === 'string' ? newValue : newValue[0] || '');
  };

  return (
    <Box sx={{ minWidth: 200 }}>
      <AdvanceAutoComplete
        TFPlaceholder={placeholder}
        setValue={handleChange}
        stateOption={options}
        value={value || ""}
      />
    </Box>
  );
}