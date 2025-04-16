export interface Group {
    id: number; // ReadOnly
    name: string;
    devices?: { id: number; name: string }[] | [];// uniqueItems: true
}
  
export interface OpaTableProps {
    data: Group[];
    columns: any[];
    onView: (row: any) => void;
    onEdit: (row: any) => void;
    onDelete: (row: any) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
}
