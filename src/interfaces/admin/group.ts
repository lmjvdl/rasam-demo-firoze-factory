export interface Group {
    id: number; // ReadOnly
    name: string;
    permissions?: { id: number; name: string }[] | [];
}
  
export interface GroupTableProps {
    data: Group[];
    columns: any[];
    onView: (row: Group) => void;
    onEdit: (row: Group) => void;
    onDelete: (row: Group) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
}
