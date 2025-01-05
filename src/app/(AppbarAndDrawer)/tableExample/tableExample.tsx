
import DynamicTable from '@/components/Table/DynamicTable';
import React, { useState } from 'react';
import { DateObject } from 'react-multi-date-picker';

const SampleUsage: React.FC = () => {
  const [filters, setFilters] = useState({
    timeRange: [],
    oneDay: new DateObject(),
    singleSelect: { placeholder: 'Select an option', options: ['Option 1', 'Option 2'] },
    multiSelect: { placeholder: 'Select multiple options', options: ['Option A', 'Option B', 'Option C'] },
    subRange: [],
  });

  const [data, setData] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ]);

  const handleFilterChange = (filterKey: string, value: any) => {
    setFilters((prev) => ({ ...prev, [filterKey]: value }));
  };

  const handleSearch = () => {
    console.log('Filters applied:', filters);
  };

  return (
    <DynamicTable
      columns={[{ key: 'id', label: 'ID' }, { key: 'name', label: 'Name' }, { key: 'email', label: 'Email' }]}
      data={data}
      filters={filters}
      onFilterChange={handleFilterChange}
      onSearch={handleSearch}
      dropdownTypes={['range', 'oneDay', 'singleSelect', 'multiSelect']}
    />
  );
};

export default SampleUsage;
