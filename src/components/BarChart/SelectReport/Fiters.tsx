import React from 'react';
import { Box, Button } from '@mui/material';
import RangeDropdown from '../../FiltersReportDropDown/Range';
import DeviceDropdown from '../../FiltersReportDropDown/Device';

interface FiltersProps {
  filters: { [key: string]: string | number | string[] };
  onChange: (filterKey: string, value: string | number | string[]) => void;
  onSearch: () => void;
  dropdownTypes: string[];
}

const Filters: React.FC<FiltersProps> = ({ filters, onChange, onSearch, dropdownTypes }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
        gap: 2,
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: 2,
      }}
    >
      {dropdownTypes.includes('range') && (
        <RangeDropdown
          value={filters.timeRange as string}
          onChange={(value) => onChange('timeRange', value)}
        />
      )}

      {dropdownTypes.includes('device') && (
        <DeviceDropdown
          value={filters.device && Array.isArray(filters.device) ? filters.device[0] : ''}
          onChange={(value) => onChange('device', value)}
        />
      )}

      <Box>
        <Button variant="contained" fullWidth onClick={onSearch}>
          جست‌وجو
        </Button>
      </Box>
    </Box>
  );
};

export default Filters;
