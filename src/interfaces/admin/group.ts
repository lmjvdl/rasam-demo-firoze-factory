export interface Group {
    id: number; // ReadOnly
    name: string;
    permissions?: { id: number; name: string }[] | [];
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
