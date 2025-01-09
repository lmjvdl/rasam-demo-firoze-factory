import React from 'react';
import Filters from '../Chart/DynamicFilters';
import { DateObject } from 'react-multi-date-picker';
import { Table, TableHead, TableRow, TableCell, TableBody, Box } from '@mui/material';

interface DynamicTableProps {
  columns: { key: string; label: string; icon?: React.ReactNode }[];
  data: any[];
  filters: {
    timeRange: DateObject[];
    oneDay: DateObject;
    singleSelect: { placeholder: string; options: string[] };
    multiSelect: { placeholder: string; options: string[] };
    subRange: string[];
  };
  onFilterChange: (filterKey: string, value: string | number | string[]) => void;
  onSearch: () => void;
  dropdownTypes: string[];
}

const DynamicTable: React.FC<DynamicTableProps> = ({ columns, data, filters, onFilterChange, onSearch, dropdownTypes }) => {
  return (
    <Box>
      <Filters filters={filters} onChange={onFilterChange} onSearch={onSearch} dropdownTypes={dropdownTypes} />
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.key}>
                {column.label}
                {column.icon && <span style={{ marginLeft: '8px' }}>{column.icon}</span>}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
                <TableCell key={column.key}>{row[column.key]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default DynamicTable;
