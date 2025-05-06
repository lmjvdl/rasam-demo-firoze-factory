interface Shift {
    id: number; // ReadOnly
    name: string;
}
  
export interface ShiftTableProps {
    data: Shift[];
    columns: any[];
    onView: (row: any) => void;
    onEdit: (row: any) => void;
    onDelete: (row: any) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
}
  