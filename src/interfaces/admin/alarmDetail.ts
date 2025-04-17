export interface AlarmDetail {
    id: number;
    alarm_info: { id: number; name: string } | null;
    parameter_info: { id: number; name: string } | null;
    value: number;
}
  
export interface AlarmDetailTableProps {
    data: AlarmDetail[];
    columns: any[];
    onView: (row: any) => void;
    onEdit: (row: any) => void;
    onDelete: (row: any) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
}