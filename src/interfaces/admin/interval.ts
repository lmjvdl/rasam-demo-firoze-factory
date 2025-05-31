export interface Interval {
    id: number; // ReadOnly
    name: string;
    duration: string;
    is_shift: boolean;
}
  
export interface IntervalTableProps {
    data: Interval[];
    columns: any[];
    onView: (row: Interval) => void;
    onEdit: (row: Interval) => void;
    onDelete: (row: Interval) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
    booleanAttributeName: string;
    trueLabel: string;
    falseLabel: string;
}