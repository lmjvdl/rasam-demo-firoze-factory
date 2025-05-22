export interface Operation {
  id: number; // ReadOnly
  datatype_operation: Record<string, string> | null;
  device: { id: number; name: string } | null;
  devices: { id: number; name: string }[] | [];
}

  
export interface OperationTableProps {
    data: Operation[];
    columns: any[];
    onView: (row: any) => void;
    onEdit: (row: any) => void;
    onDelete: (row: any) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
    dataTypeMap?: Map<number, string>; 
}
