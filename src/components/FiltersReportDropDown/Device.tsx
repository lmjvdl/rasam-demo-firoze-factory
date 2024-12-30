import React from 'react';
import { MenuItem, Select, Box } from '@mui/material';

interface DeviceDropDownProps {
  value: string;
  onChange: (value: string) => void;
}

const DeviceDropDown: React.FC<DeviceDropDownProps> = ({ value, onChange }) => {
  return (
    <Box>
      <Select
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
        displayEmpty
      >
        <MenuItem value="1">بالمیل 1</MenuItem>
        <MenuItem value="2">بالمیل 2</MenuItem>
        <MenuItem value="3">بالمیل 3</MenuItem>
      </Select>
    </Box>
  );
};

export default DeviceDropDown;
