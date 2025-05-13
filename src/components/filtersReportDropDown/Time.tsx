import React from 'react';
import { Box } from '@mui/material';
import CustomTimePicker from '../timePicker/timePicker';
import { TimeDropdownProps } from '@/interfaces/ui/inputs/DynamicInputs';

const TimeDropdown: React.FC<TimeDropdownProps> = ({ value, placeholder, disabled, onChange }) => {
  return (
    <Box>
      <CustomTimePicker value={value} onChange={onChange} placeholder={placeholder} disabled={disabled}/>
    </Box>
  );
};

export default TimeDropdown;
