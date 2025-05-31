export interface AlarmDetail {
    id: number;
    alarm_info: { id: number; name: string } | null;
    parameter_info: { id: number; name: string } | null;
    value: number;
}
  
export interface AlarmDetailTableProps {
    data: AlarmDetail[];
    columns: any[];
    onView: (row: AlarmDetail) => void;
    onEdit: (row: AlarmDetail) => void;
    onDelete: (row: AlarmDetail) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
}