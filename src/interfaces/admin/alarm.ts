export interface Alarm {
    id: number;
    name: string;
    function: { id: number; name: string } | null;
    description: string;
    device: { id: number; name: string } | null;
    type: { id: number; name: string } | null;
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