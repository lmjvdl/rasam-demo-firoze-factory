import * as React from "react";
import { Box } from "@mui/material";
import AdvanceAutoComplete from "../AutoComplete/AdvanceAutoComplete";
import { DeviceDropDownProps } from "@/interfaces/UI/inputs/DynamicInputs";

export default function SingleSelect({
  placeholder,
  options,
  onChange,
  value,
}: DeviceDropDownProps) {
  return (
    <Box sx={{ minWidth: 200 }}>
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
