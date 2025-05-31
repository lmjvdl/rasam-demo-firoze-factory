export interface OutputItem {
    id: number; // ReadOnly
    name: string;
}
  
export interface OutputItemTableProps {
    data: OutputItem[];
    columns: any[];
    onView: (row: OutputItem) => void;
    onEdit: (row: OutputItem) => void;
    onDelete: (row: OutputItem) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
}
  