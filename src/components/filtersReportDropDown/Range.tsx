import React from 'react';
import { Box } from '@mui/material';
import { RangeDropdownProps } from '@/interfaces/ui/inputs/DynamicInputs';
import CustomDatePicker from '../datePicker/CustomDatePicker';


const RangeDropdown: React.FC<RangeDropdownProps> = ({ value, onChange, disabled }) => {
  return (
    <Box>
      <CustomDatePicker value={value} onChange={onChange} disabled={disabled}/>
    </Box>
  );
};


export default RangeDropdown;
