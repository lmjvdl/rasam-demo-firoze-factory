export interface ProductLine {
    id: number; // ReadOnly
    company: { id: number; name: string } | null;
    name: string;
    code: string;
    icon: string;
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
