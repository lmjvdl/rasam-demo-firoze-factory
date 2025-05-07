interface OutputItem {
    id: number; // ReadOnly
    name: string;
}
  
export interface OutputItemTableProps {
    data: OutputItem[];
    columns: any[];
    onView: (row: any) => void;
    onEdit: (row: any) => void;
    onDelete: (row: any) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
}
  