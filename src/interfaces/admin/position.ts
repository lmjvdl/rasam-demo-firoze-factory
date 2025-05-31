export interface Position {
    id: number; // ReadOnly
    name: string;
}
  
export interface PositionTableProps {
    data: Position[];
    columns: any[];
    onView: (row: Position) => void;
    onEdit: (row: Position) => void;
    onDelete: (row: Position) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
}
  