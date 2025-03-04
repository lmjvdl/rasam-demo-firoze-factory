interface ModalFormProps {
    buttonText: string;
    formFields: {
        name: string;
        label: string;
        type: string;
        options?: { label: string; value: string }[];
        required: boolean;
    }[];
    sxButton?: object;
    onSubmit: (data: any) => Promise<{ success: boolean; error?: string }>;
}

interface Column {
  id: string;
  label: string;
  render?: (row: any) => React.ReactNode;
  isActionColumn?: boolean;
  isAdditionalAction?: boolean;
  showOnTable?: boolean;
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
    onSave: (updatedData: any) => void;
    rowData: any;
    titles: any;
}

interface ViewDialogProps {
    open: boolean;
    onClose: () => void;
    rowData: any | null;
    titles: any | null;
}

interface ViewUserDetailModal {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    rowData: any;
    titles: any;
}