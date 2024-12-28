import React from 'react';
import { MenuItem, Select, Box } from '@mui/material';

interface RangeDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const RangeDropdown: React.FC<RangeDropdownProps> = ({ value, onChange }) => {
  return (
    <Box>
      <Select
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
        displayEmpty
      >
        <MenuItem value="">بازه زمانی</MenuItem>
        <MenuItem value="lastWeek">هفته گذشته</MenuItem>
        <MenuItem value="lastMonth">ماه گذشته</MenuItem>
        <MenuItem value="custom">سفارشی</MenuItem>
      </Select>
    </Box>
  );
};

export default RangeDropdown;
