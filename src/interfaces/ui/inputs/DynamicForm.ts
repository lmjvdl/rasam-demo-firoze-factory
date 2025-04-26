export type InputType =
  | "text"
  | "number"
  | "select"
  | "password"
  | "datepicker"
  | "rangePicker"
  | "datepicker-single"
  | "multiSelect"
  | "oneDay"
  | "timeRange"
  | "range";

export interface Option {
  label: string;
  value: string | number;
}

export interface DynamicInputProps {
  type: InputType;
  value: any;
  onChange: (value: any) => void;
  options?: Option[];
  error?: boolean;
  helperText?: string;
  label: string;
}

export interface DynamicInputConfig extends Omit<DynamicInputProps, 'error' | 'helperText'> {
  name: string;
  required?: boolean;
}

export interface DynamicInputsProps {
  fields: DynamicInputConfig[];
  onSubmit: (data: any) => void;
}
