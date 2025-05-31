export interface Report {
    id: number; // ReadOnly
    name: string;
    input_items: { id: number; name: string }[] | [];
    ouput_item: { id: number; name: string } | null;
    intervals: { id: number; name: string }[] | [];
    api_func: string;
    product_line_part: { id: number; name: string } | null;
  }
  
  
export interface ReportTableProps {
    data: Report[];
    columns: any[];
    onView: (row: Report) => void;
    onEdit: (row: Report) => void;
    onDelete: (row: Report) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
}