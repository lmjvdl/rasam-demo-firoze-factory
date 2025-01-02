import React from 'react';
import { Box, Button } from '@mui/material';
import RangeDropdown from '../../FiltersReportDropDown/Range';
import DeviceDropdown from '../../FiltersReportDropDown/Device';
import OneDayDropdown from '@/components/FiltersReportDropDown/OneDay';
import { DateObject } from 'react-multi-date-picker';
import { Height } from '@mui/icons-material';

interface FiltersProps {
  filters: { 
    timeRange: DateObject[]; 
    oneDay: DateObject; 
    device: string[]; 
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
        bgcolor: 'background.paper',
        borderRadius: 2,
      }}
    >
      {dropdownTypes.includes('range') && (
        <RangeDropdown
          value={filters.timeRange}
          onChange={(value: DateObject[]) => onChange('timeRange', value)}
        />
      )}

      {dropdownTypes.includes('oneDay') && (
        <OneDayDropdown
          value={filters.oneDay}
          onChange={(value: DateObject) => onChange('oneDay', value)}
        />
      )}

      {dropdownTypes.includes('device') && (
        <DeviceDropdown
          placeholder='نوع دستگاه'
          value={filters.device[0] || ''}
          onChange={(value: string) => onChange('device', [value])}
        />
      )}
      <Box>
        <Button 
          variant="contained" 
          fullWidth 
          onClick={onSearch}
          style={{height: "56px"}}
          >
          جست‌وجو
        </Button>
      </Box>
    </Box>
  );
};

export default Filters;
