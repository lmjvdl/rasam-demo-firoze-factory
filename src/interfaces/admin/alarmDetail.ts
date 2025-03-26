interface AlarmDetail {
    id: number;
    alarm: number;
    parameter: number;
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