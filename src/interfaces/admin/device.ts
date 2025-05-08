export interface Device {
    id: number; // ReadOnly
    product_line_part: { id: number; name: string } | null;
    name: string;
    code: string;
    on_off_identifier: { id: number; name: string } | null;
    data_type: { id: number; name: string }[] | [];
    value: number;
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
