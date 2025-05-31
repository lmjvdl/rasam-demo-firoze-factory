export interface Shift {
    id: number; // ReadOnly
    name: string;
    start_date: string | null;
    end_date: string | null;
    start_time: string | null;
    end_time: string | null;
    company: { id: number; name: string } | null;
}
  
export interface ShiftTableProps {
    data: Shift[];
    columns: any[];
    onView: (row: Shift) => void;
    onEdit: (row: Shift) => void;
    onDelete: (row: Shift) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
}
  