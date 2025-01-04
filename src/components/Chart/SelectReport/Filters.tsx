import React from 'react';
import { Box, Button } from '@mui/material';
import RangeDropdown from '../../FiltersReportDropDown/Range';
import OneDayDropdown from '@/components/FiltersReportDropDown/OneDay';
import { DateObject } from 'react-multi-date-picker';
import SingleSelect from '../../FiltersReportDropDown/SingleSelect';
import MultiSelect from '../../FiltersReportDropDown/MultiSelect';
import SubRange from '../../FiltersReportDropDown/SubRange';

interface FiltersProps {
  filters: { 
    timeRange: DateObject[]; 
    oneDay: DateObject;
    singleSelect: {placeholder: string, options: string[]};
    multiSelect: {placeholder: string, options: string[]};
    subRange: string[];
    [key: string]: any;
  };
  onChange: (filterKey: string, value: any) => void;
  onSearch: () => void;
  dropdownTypes: string[];
}


const Filters: React.FC<FiltersProps> = ({ filters, onChange, onSearch, dropdownTypes }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
        gap: 2,
        p: 2,
        borderRadius: 2,
      }}
    >
      {dropdownTypes.includes('range') && (
        <RangeDropdown
          value = {filters.timeRange}
          onChange = {(value: DateObject[]) => onChange('timeRange', value)}
        />
      )}

      {dropdownTypes.includes('oneDay') && (
        <OneDayDropdown
          value = {filters.oneDay}
          onChange = {(value: DateObject) => onChange('oneDay', value)}
        />
      )}

      {dropdownTypes.includes('singleSelect') && (
        <SingleSelect
          placeholder = {filters.singleSelect.placeholder}
          options = {filters.singleSelect.options}
          onChange = {(value: string) => onChange('singleSelect', [value])}
        />
      )}

      {dropdownTypes.includes('multiSelect') && (
        <MultiSelect
        placeholder = {filters.multiSelect.placeholder}
        options = {filters.multiSelect.options}
          onChange = {(value: string[]) => onChange('multiSelect', [value])}
          />
      )}

      {dropdownTypes.includes('subRange') && (
        <SubRange
          options = {filters.subRange}
          onChange = {(value: string) => onChange('subRange', [value])}
        />
      )}

      <Box>
        <Button 
          variant = "contained" 
          fullWidth 
          onClick = {onSearch}
          style = {{height: "55px"}}
          >
          جست‌وجو
        </Button>
      </Box>
    </Box>
  );
};

export default Filters;
