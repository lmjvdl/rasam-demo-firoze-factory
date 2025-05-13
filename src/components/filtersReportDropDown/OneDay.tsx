import React from 'react';
import { Box } from '@mui/material';
import CustomDatePickerOneDay from '../datePicker/CustomDatePickerOneDay';
import { OneDayDropdownProps } from '@/interfaces/ui/inputs/DynamicInputs';

const OneDayDropdown: React.FC<OneDayDropdownProps> = ({ value, placeholder, disabled, onChange }) => {
  console.log(value)
  return (
    <Box>
      <CustomDatePickerOneDay value={value} onChange={onChange} placeholder={placeholder} disabled={disabled}/>
    </Box>
  );
};

export default OneDayDropdown;
