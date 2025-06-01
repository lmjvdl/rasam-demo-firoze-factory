import { TitlesColumnsData } from "./general";

export interface Position {
    id: number; // ReadOnly
    name: string;
}
  
export interface PositionTableProps {
    data: Position[];
    columns: TitlesColumnsData[];
    onView: (row: Position) => void;
    onEdit: (row: Position) => void;
    onDelete: (row: Position) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
}
  