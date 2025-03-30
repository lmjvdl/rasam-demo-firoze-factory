export interface Device {
    id: number; // ReadOnly
    product_line_part: number;
    name: string;
    code: string;
    data_type: { id: number; name: string }[] | [];
}
export interface DeviceTableProps {
    data: Device[];
    columns: any[];
    onView: (row: any) => void;
    onEdit: (row: any) => void;
    onDelete: (row: any) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
}
