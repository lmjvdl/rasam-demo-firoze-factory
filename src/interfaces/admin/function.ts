import { TitlesColumnsData } from "./general";

export interface Function {
    id: number; // ReadOnly
    name: string;
    description: string;
}
  
export interface FunctionTableProps {
    data: Function[];
    columns: TitlesColumnsData[];
    onView: (row: Function) => void;
    onEdit: (row: Function) => void;
    onDelete: (row: Function) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
}
  