export interface ModalFormProps {
  buttonText: string;
  formFields: {
    name: string;
    label: string;
    type: string;
    accept?: string;
    options?: { label: string; value: number | string }[];
    required: boolean;
    placeholder?: string;
  }[];
  onSubmit: (data: any) => Promise<{ success: boolean; error?: string }>;
  icons?: { id: number; url: string }[];
  loadingIcons?: boolean;
  fixedValues?: Record<string, any>;
  customComponent?: React.ReactNode;
}

export interface TitlesColumnsData {
  id: string;
  label: string;
  render?: (row: any) => React.ReactNode;
  required?: boolean;
  showOnTable?: boolean;
  canEdit?: boolean;
  isAdditionalAction?: boolean;
  isMultiSelect?: boolean;
  isIconSelect?: boolean; 
  optionsKey?: string;
  isSingleSelect?: boolean;
  isActionColumn?: boolean;
  isImage?: boolean;
  placeholder?: string;
  isKeyValueObject?: boolean;
  ListKeyObject?: string;
}

export interface DataTableProps {
  columns: TitlesColumnsData[];
  data: any[];
  onView?: (row: any) => void;
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  count: number;
  page: number;
  onPageChange: (newPage: number) => void;
  arrayColumns?: { [key: string]: string }; 
  keyObjectValMap?: Map<number, string>; 
  booleanAttributeName?: string;
  trueLabel?: string;
  falseLabel?: string;
}

export interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  rowData: any;
  titles: Array<TitlesColumnsData>;
  arrayAttributes?: { [key: string]: string };
}

export interface EditDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  rowData?: { [key: string]: any };
  titles: Array<TitlesColumnsData>;
  booleanAttributeName?: string;
  trueLabel?: string;
  falseLabel?: string;
  booleanValue?: boolean;
  onBooleanValueChange?: (value: boolean) => void;
  extraOptions?: { [key: string]: {
    id: any;
    label: string;
    value?: any;
    name?: string;
  }[] };
  timeObject?: {
    [key: string]: {
      type: 'date' | 'time'; 
      field: string;
    };
  };
  objectAttributes?: string[];
  arrayObjectAttributes?: string[];
  keyValObject?: {
    attribue: string;
    lockKey: boolean;
    values: {
      [key: string]: { options: "sum" | "avg" }[]
    }
  }
}

export interface ViewDialogProps {
  open: boolean;
  onClose: () => void;
  rowData: any;
  titles: Array<TitlesColumnsData>;
  booleanAttributeName?: string;
  falseLabel?: string;
  trueLabel?: string;
  arrayAttributes?: Record<string, string>;
  objectAttributes?: string[];
}

