interface LiveType {
    id: number; // ReadOnly
    name: string;
}
  
export interface LiveTypesTableProps {
    data: LiveType[];
    columns: any[];
    onView: (row: LiveType) => void;
    onEdit: (row: LiveType) => void;
    onDelete: (row: LiveType) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
}
  