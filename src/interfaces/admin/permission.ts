interface Permission {
    id: number; // ReadOnly
    name: string;
    code_name?: string; // uniqueItems: true
    translate?: string | null; // nullable
}
  
export interface PermissionTableProps {
    data: Permission[];
    columns: any[];
    onView: (row: any) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
}
