interface ProductLine {
    id: number; // ReadOnly
    company: number;
    name: string;
    code: string;
    icon?: number | null;
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
