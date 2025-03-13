import React from 'react';
import { Box } from '@mui/material';
import CustomDatePicker from '../catePicker/CustomDatePicker';
import { RangeDropdownProps } from '@/interfaces/ui/inputs/DynamicInputs';


const RangeDropdown: React.FC<RangeDropdownProps> = ({ value, onChange }) => {
  return (
    <Box>
      <CustomDatePicker value={value} onChange={onChange} />
    </Box>
  );
};


export default RangeDropdown;
