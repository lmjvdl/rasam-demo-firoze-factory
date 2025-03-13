import { ReactNode } from "react";
import { DateObject } from "react-multi-date-picker";

export interface SubRangeDropDownProps {
    options: string[];
    onChange: (value: string) => void;
} 

export interface SingleDropDownProps {
    options: string[];
    onChange: (newValue: string) => void;
    placeholder: string;
    value: string;
}

export interface RangeDropdownProps {
    value: DateObject[];
    onChange: (selectedDates: DateObject[]) => void;
}

export interface OneDayDropdownProps {
    value: DateObject;
    onChange?: (selectedDate: DateObject) => void;
}

export interface DeviceDropDownProps {
    options: string[];
    onChange: (value: string[]) => void;
    placeholder: string;
    value: Array<string | object>;
}

export interface CalendarInputProps {
    value?: DateObject[];
    openCalendar?: () => void;
}

export interface AdvanceAutoCompleteProps {
    multiple?: boolean;
    TFPlaceholder?: string;
    TFLabel?: string;
    limitTags?: number;
    label?: string;
    uniqeProperty?: string | number;
    value: any;
    setValue: any;
    stateOption: any;
    extraComponents?: ReactNode;
    selectAllEnabled?: boolean;
    size?: "small" | "medium";
}

export interface CustomPaperProps {
    props: React.HTMLAttributes<HTMLElement>;
    allIsSelected: boolean;
    indeterminateActive: boolean;
    handleSelectAllCheckBox: () => void;
    multiple: boolean;
    extraComponents?: ReactNode;
    selectAllEnabled?: boolean;
}
  

export interface DynamicFiltersProps {
    filters: {
      timeRange: DateObject[];
      oneDay: DateObject;
      singleSelect: { placeholder: string; options: string[],value:string };
      multiSelect: { placeholder: string; options: string[] ,value:string[] };
      subRange: string[];
    };
    onChange: (filterKey: string, value: string | number | string[]) => void;
    onSearch: () => void;
    dropdownTypes: string[];
  }