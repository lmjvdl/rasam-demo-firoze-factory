export interface FunctionParameter {
    id: number; 
    name: string;
    function_info: { id: number; name: string } | null;
}
  
export interface FunctionParameterTableProps {
    data: FunctionParameter[];
    columns: any[];
    onView: (row: FunctionParameter) => void;
    onEdit: (row: FunctionParameter) => void;
    onDelete: (row: FunctionParameter) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
}
  