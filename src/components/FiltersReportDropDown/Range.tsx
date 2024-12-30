import React from 'react';
import { Box } from '@mui/material';
import { DateObject } from 'react-multi-date-picker';
import CustomDatePicker from '../DatePicker/CustomDatePicker';


interface RangeDropdownProps {
  value: DateObject[];
  onChange: (selectedDates: DateObject[]) => void;
}

const RangeDropdown: React.FC<RangeDropdownProps> = ({ value, onChange }) => {
  return (
    <Box>
      <CustomDatePicker value={value} onChange={onChange} />
    </Box>
  );
};


export default RangeDropdown;
