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
    columns: any[];
    onView: (row: any) => void;
    onEdit: (row: any) => void;
    onDelete: (row: any) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
}
