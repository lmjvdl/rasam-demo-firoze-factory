import { TitlesColumnsData } from "./general";

export interface ProductLine {
    id: number; // ReadOnly
    company: { id: number; name: string } | null;
    name: string;
    code: string;
    dark_icon: string;
    light_icon: string
}

export interface ProductLineTableProps {
    data: ProductLine[];
    columns: TitlesColumnsData[];
    onView: (row: ProductLine) => void;
    onEdit: (row: ProductLine) => void;
    onDelete: (row: ProductLine) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
}
