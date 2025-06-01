import { TitlesColumnsData } from "./general";

export interface Report {
    id: number; // ReadOnly
    name: string;
    input_items_info: { id: number; name: string }[] | [];
    output_item_info: { id: number; name: string }[] | [];
    intervals_info: { id: number; name: string }[] | [];
    api_func: string;
    product_line_part_info: { id: number; name: string } | null;
  }
  
  
export interface ReportTableProps {
    data: Report[];
    columns: TitlesColumnsData[];
    onView: (row: Report) => void;
    onEdit: (row: Report) => void;
    onDelete: (row: Report) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
}