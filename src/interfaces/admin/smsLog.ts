interface SmsLog {
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
    onView: (row: any) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
}
