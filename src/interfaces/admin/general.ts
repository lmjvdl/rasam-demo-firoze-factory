interface ModalFormProps {
  buttonText: string;
  formFields: {
    name: string;
    label: string;
    type: string;
    accept?: string;
    options?: { label: string; value: number }[];
    required: boolean;
  }[];
  onSubmit: (data: any) => Promise<{ success: boolean; error?: string }>;
  icons?: { id: number; url: string }[];
  loadingIcons?: boolean;
  fixedValues?: Record<string, any>;
}

interface Column {
  id: string;
  label: string;
  render?: (row: any) => React.ReactNode;
  isActionColumn?: boolean;
  isAdditionalAction?: boolean;
  showOnTable?: boolean;
  isImage?: boolean;
  isMultiSelect?: boolean; 
  isSingleSelect?: boolean;
  optionsKey?: string; 
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onView?: (row: any) => void;
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  count: number;
  page: number;
  onPageChange: (newPage: number) => void;
  arrayColumns?: { [key: string]: string }; 
}


interface DeleteDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    rowData: any;
    titles: any;
}

interface EditDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  rowData?: { [key: string]: any };
  titles: Array<{
    id: string;
    label: string;
    required?: boolean;
    showOnTable?: boolean;
    canEdit?: boolean;
    isAdditionalAction?: boolean;
    isMultiSelect?: boolean;
    isIconSelect?: boolean; 
    optionsKey?: string;
    isSingleSelect?: boolean;
  }>;
  booleanAttributeName?: string;
  trueLabel?: string;
  falseLabel?: string;
  booleanValue?: boolean;
  onBooleanValueChange?: (value: boolean) => void;
  extraOptions?: { [key: string]: {
    id: any; value: any; label: string 
}[] };
}

interface ViewDialogProps {
  open: boolean;
  onClose: () => void;
  rowData: any | null;
  titles: any | null;
  booleanValue?: boolean;
  booleanAttributeName?: string;
  trueLabel?: string;
  falseLabel?: string;
  arrayAttributes?: { [key: string]: string };
}


