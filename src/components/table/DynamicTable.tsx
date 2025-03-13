import React from 'react';
import Filters from '../chart/DynamicFilters';
import { Table, TableHead, TableRow, TableCell, TableBody, Box } from '@mui/material';
import { DynamicTableProps } from '@/interfaces/ui/tables/dynamicTable';


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
