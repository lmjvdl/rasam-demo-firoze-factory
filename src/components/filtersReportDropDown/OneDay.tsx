import React from 'react';
import { Box } from '@mui/material';
import CustomDatePickerOneDay from '../catePicker/CustomDatePickerOneDay';
import { OneDayDropdownProps } from '@/interfaces/ui/inputs/DynamicInputs';

const OneDayDropdown: React.FC<OneDayDropdownProps> = ({ value, onChange }) => {
  return (
    <Box>
      <CustomDatePickerOneDay value={value} onChange={onChange} />
    </Box>
  );
};

export default OneDayDropdown;
