export interface ProductLinePart {
    id: number; // ReadOnly
    product_line: number;
    name: string;
    code: string;
    icon?: number | null;
}

export interface ProductLinePartTableProps {
    data: ProductLinePart[];
    columns: any[];
    onView: (row: any) => void;
    onEdit: (row: any) => void;
    onDelete: (row: any) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
}
