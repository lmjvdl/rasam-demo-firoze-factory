export interface Alarm {
    id: number;
    name: string;
    function_info: { id: number; name: string } | null;
    description: string;
    device_info: { id: number; name: string } | null;
    type_info: { id: number; name: string } | null;
    message: string;
    receiver_info: { id: number; name: string } | null;
    message_type: string;
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