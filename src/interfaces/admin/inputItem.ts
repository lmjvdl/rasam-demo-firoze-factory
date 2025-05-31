export interface InputItem {
    id: number; // ReadOnly
    name: string;
    required: boolean;
}
  
export interface InputItemTableProps {
    data: InputItem[];
    columns: any[];
    onView: (row: any) => void;
    onEdit: (row: any) => void;
    onDelete: (row: any) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
    booleanAttributeName: string;
    trueLabel: string;
    falseLabel: string;
}
  