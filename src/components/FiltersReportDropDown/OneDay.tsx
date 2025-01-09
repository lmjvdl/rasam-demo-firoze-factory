import React from 'react';
import { Box } from '@mui/material';
import { DateObject } from 'react-multi-date-picker';
import CustomDatePickerOneDay from '../DatePicker/CustomDatePickerOneDay';


interface OneDayDropdownProps {
  value: DateObject;
  onChange: (selectedDate: DateObject) => void;
}

const OneDayDropdown: React.FC<OneDayDropdownProps> = ({ value, onChange }) => {
  return (
    <Box>
      <CustomDatePickerOneDay value={value} onChange={onChange} />
    </Box>
  );
};

export default OneDayDropdown;
