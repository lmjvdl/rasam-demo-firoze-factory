import * as React from "react";
import { Box, Button, Stack } from "@mui/material";
import AdvanceAutoComplete from "../AutoComplete/AdvanceAutoComplete";

interface SingleDropDownProps {
  options: string[];
  onChange: (newValue: string) => void;
  placeholder: string;
  value: string;
}

export default function SingleSelect({
  placeholder,
  options,
  onChange,
  value,
}: SingleDropDownProps) {
  return (
    <Box sx={{ minWidth: 200 }}>
      <AdvanceAutoComplete
        TFPlaceholder={placeholder}
        setValue={onChange}
        stateOption={options}
        value={value || ""}
      />
    </Box>
  );
}
