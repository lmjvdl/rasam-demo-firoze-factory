import React from 'react';
import { Box } from '@mui/material';
import CustomDatePicker from '../DatePicker/CustomDatePicker';
import { RangeDropdownProps } from '@/interfaces/UI/inputs/DynamicInputs';


const RangeDropdown: React.FC<RangeDropdownProps> = ({ value, onChange }) => {
  return (
    <Box>
      <CustomDatePicker value={value} onChange={onChange} />
    </Box>
  );
};


export default RangeDropdown;
