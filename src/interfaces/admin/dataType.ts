export interface DataType {
    id: number; // ReadOnly
    name: string;
    json_field: string;
    description?: string | null;
  }
  
  
export interface DataTypeTableProps {
    data: DataType[];
    columns: any[];
    onView: (row: any) => void;
    onEdit: (row: any) => void;
    onDelete: (row: any) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
}