import React from "react";
import { TextField } from "@mui/material";
import { InputWrapperProps } from "@/interfaces/ui/inputs/DynamicInputs";

const InputWrapper: React.FC<InputWrapperProps> = ({
  field,
  config,
  error,
  helperText,
}) => {
  return (
    <TextField
      {...field}
      label={config.label}
      type={config.type}
      fullWidth
      required={config.required}
      error={error}
      helperText={helperText}
      variant="outlined"
    />
  );
};

export default InputWrapper;
