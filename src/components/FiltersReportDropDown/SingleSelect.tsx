import * as React from "react";
import { Box, Button, Stack } from "@mui/material";
import AdvanceAutoComplete from "../AutoComplete/AdvanceAutoComplete";
import { SingleDropDownProps } from "@/interfaces/UI/inputs/DynamicInputs";


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
