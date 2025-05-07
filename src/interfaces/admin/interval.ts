interface Interval {
    id: number; // ReadOnly
    name: string;
    duration: string;
}
  
export interface IntervalTableProps {
    data: Interval[];
    columns: any[];
    onView: (row: any) => void;
    onEdit: (row: any) => void;
    onDelete: (row: any) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
}
  