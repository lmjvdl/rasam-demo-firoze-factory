export interface InputItem {
    id: number; // ReadOnly
    name: string;
    required: boolean;
}
  
export interface InputItemTableProps {
    data: InputItem[];
    columns: any[];
    onView: (row: InputItem) => void;
    onEdit: (row: InputItem) => void;
    onDelete: (row: InputItem) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
    booleanAttributeName: string;
    trueLabel: string;
    falseLabel: string;
}
  