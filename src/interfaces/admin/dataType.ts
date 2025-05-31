export interface DataType {
    id: number; // ReadOnly
    name: string;
    json_field: string;
    description?: string | null;
  }
  
  
export interface DataTypeTableProps {
    data: DataType[];
    columns: any[];
    onView: (row: DataType) => void;
    onEdit: (row: DataType) => void;
    onDelete: (row: DataType) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
}