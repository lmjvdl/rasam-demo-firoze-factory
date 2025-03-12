import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Checkbox,
  ListItemText,
  SelectChangeEvent,
} from "@mui/material";

interface MultiSelectWithCheckboxProps {
  label: string;
  name: string;
  options: { id: number; name: string }[];
  selectedItems: { id: number; name: string }[];
  value: number[];
  onChange: (event: SelectChangeEvent<number[]>) => void;
}

const MultiSelectWithCheckbox: React.FC<MultiSelectWithCheckboxProps> = ({
  label,
  name,
  options,
  selectedItems,
  value,
  onChange,
}) => {
  return (
    <FormControl fullWidth margin="dense">
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        name={name}
        value={value}
        onChange={onChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) =>
          selected
            .map((id) => options.find((opt) => opt.id === id)?.name)
            .join(", ")
        }
      >
        {options.map((option) => {
          const isSelected = selectedItems.some((item) => item.id === option.id);
          return (
            <MenuItem key={option.id} value={option.id}>
              {isSelected && <Checkbox checked={value.includes(option.id)} />}
              <ListItemText primary={option.name} />
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default MultiSelectWithCheckbox;
