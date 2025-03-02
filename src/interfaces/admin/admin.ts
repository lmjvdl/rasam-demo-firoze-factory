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
    isActionColumn?: boolean;
    isAdditionalAction?: boolean;
}

interface Column {
  id: string;
  label: string;
  render?: (row: any) => React.ReactNode;
  isActionColumn?: boolean;
  isAdditionalAction?: boolean;
}


interface Column {
    id: string;
    label: string;
    isActionColumn?: boolean;
}
  
interface DataTableProps {
    columns: Column[];
    data: any[];
    onView?: (row: any) => void;
    onEdit?: (row: any) => void;
    onDelete?: (row: any) => void;
    count: number;
    page: number;
    onPageChange: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => void;
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

interface Company {
    id: number;
    name: string;
    description: string | null;
    code: string;
    logo: string | null | undefined;
}


interface CompanyTableProps {
    data: Company[];
    columns: any[];
    onView: (row: any) => void;
    onEdit: (row: any) => void;
    onDelete: (row: any) => void;
    handleUsersView: (companyId: number) => void;
    selectedCompanyId: number | null;
    userList: { id: number; user: number }[];
    viewUsersOpen: boolean;
    count: number;
    page: number; 
    onPageChange: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => void;
}
