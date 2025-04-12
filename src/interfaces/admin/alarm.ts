export interface Alarm {
    id: number;
    name: string;
    function_info: { id: number; name: string } | null;
    description: string;
    device_info: { id: number; name: string } | null;
    type_info: { id: number; name: string } | null;
  }
  
export interface AlarmTableProps {
    data: Alarm[];
    columns: any[];
    onView: (row: any) => void;
    onEdit: (row: any) => void;
    onDelete: (row: any) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
}