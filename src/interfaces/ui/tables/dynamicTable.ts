import { DateObject } from "react-multi-date-picker";

export interface DynamicTableProps {
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