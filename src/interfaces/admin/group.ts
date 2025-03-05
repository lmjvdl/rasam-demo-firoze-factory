interface Group {
    id: number; // ReadOnly
    name: string;
    permissions?: number[]; // uniqueItems: true
    users?: string[] | null; // nullable
}
  
export interface GroupTableProps {
    data: Group[];
    columns: any[];
    onView: (row: any) => void;
    onEdit: (row: any) => void;
    onDelete: (row: any) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
}
