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
    columns: any[];
    onView: (row: any) => void;
    onEdit: (row: any) => void;
    onDelete: (row: any) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
}
