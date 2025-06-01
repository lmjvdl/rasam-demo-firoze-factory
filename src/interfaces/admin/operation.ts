import { TitlesColumnsData } from "./general";

export interface Operation {
  id: number; // ReadOnly
  datatype_operation: Record<string, string> | null;
  device: { id: number; name: string } | null;
  devices: { id: number; name: string }[] | [];
}

  
export interface OperationTableProps {
    data: Operation[];
    columns: TitlesColumnsData[];
    onView: (row: Operation) => void;
    onEdit: (row: Operation) => void;
    onDelete: (row: Operation) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
    dataTypeMap?: Map<number, string>; 
}
