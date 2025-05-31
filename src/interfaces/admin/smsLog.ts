export interface SmsLog {
    id: number; // ReadOnly
    to: string;
    message: string;
    status: string;
    response: string;
    created_at: string;
}
  
export interface SmsLogTableProps {
    data: SmsLog[];
    columns: any[];
    onView: (row: SmsLog) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
}
