import React from "react";
import { TextField, MenuItem } from "@mui/material";
import CustomDatePicker from "../datePicker/CustomDatePicker";
import CustomDatePickerOneDay from "../datePicker/CustomDatePickerOneDay";
import { DynamicInputProps } from "@/interfaces/ui/inputs/DynamicForm";

const DynamicInput: React.FC<DynamicInputProps> = ({ type, value, onChange, options }) => {
  switch (type) {
    case "text":
    case "number":
      return (
        <TextField
          fullWidth
          type={type}
          value={value}
          onChange={onChange}
        />
      );

    case "select":
      return (
        <TextField
          select
          fullWidth
          value={value}
          onChange={onChange}
        >
          {options?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      );

    case "datepicker":
      return <CustomDatePicker value={value} onChange={onChange} />;

    case "datepicker-single":
      return <CustomDatePickerOneDay value={value} onChange={onChange} />;

    default:
      return null;
  }
};

export default DynamicInput;
