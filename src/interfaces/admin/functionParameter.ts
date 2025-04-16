export interface FunctionParameter {
    id: number; 
    name: string;
    function_info: { id: number; name: string } | null;
}
  
export interface FunctionParameterTableProps {
    data: FunctionParameter[];
    columns: any[];
    onView: (row: any) => void;
    onEdit: (row: any) => void;
    onDelete: (row: any) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
}
  