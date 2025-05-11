export interface ProductLinePart {
    id: number; // ReadOnly
    product_line: { id: number; name: string } | null;
    name: string;
    code: string;
    icon: string;
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
