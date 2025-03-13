import React from 'react';
import Filters from './selectReport/Filters';
import { DynamicFiltersProps } from '@/interfaces/ui/inputs/DynamicInputs';


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
