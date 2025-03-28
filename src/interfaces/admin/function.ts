interface FunctionParameter {
    id: number; // ReadOnly
    name: string;
    function: number;
}
  
interface Function {
    id: number; // ReadOnly
    name: string;
    description: string;
    parameters: FunctionParameter[];
}
  
export interface FunctionTableProps {
    data: Function[];
    columns: any[];
    onView: (row: any) => void;
    onEdit: (row: any) => void;
    onDelete: (row: any) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
}
  