export interface Operation {
    id: number; // ReadOnly
    device_info: { id: number; name: string } | null;
    devices_info: { id: number; name: string }[] | [];
    operation: string;
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
}
