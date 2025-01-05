import React from 'react';
import Filters from './SelectReport/Filters';
import { DateObject } from 'react-multi-date-picker';

interface DynamicFiltersProps {
  filters: {
    timeRange: DateObject[];
    oneDay: DateObject;
    singleSelect: { placeholder: string; options: string[] };
    multiSelect: { placeholder: string; options: string[] };
    subRange: string[];
  };
  onChange: (filterKey: string, value: string | number | string[]) => void;
  onSearch: () => void;
  dropdownTypes: string[];
}

const DynamicFilters: React.FC<DynamicFiltersProps> = ({ filters, onChange, onSearch, dropdownTypes }) => {
  return (
    <Filters
      filters={filters}
      onChange={onChange}
      onSearch={onSearch}
      dropdownTypes={dropdownTypes}
    />
  );
};

export default DynamicFilters;
