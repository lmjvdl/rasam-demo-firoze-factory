interface Alarm {
    id: number; // ReadOnly
    name: string;
    function: number;
    description: string;
    device: number;
    type: number;
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