import { TitlesColumnsData } from "./general";

export interface ProductLinePart {
    id: number; // ReadOnly
    product_line: { id: number; name: string } | null;
    name: string;
    code: string;
    light_icon: string;
    dark_icon: string;
    live_type: { id: number; name: string } | null;
}

export interface ProductLinePartTableProps {
    data: ProductLinePart[];
    columns: TitlesColumnsData[];
    onView: (row: ProductLinePart) => void;
    onEdit: (row: ProductLinePart) => void;
    onDelete: (row: ProductLinePart) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
}
