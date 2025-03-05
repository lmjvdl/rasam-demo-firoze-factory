export interface DeviceData {
    id: number; // ReadOnly
    device: number;
    data_type: number[];
}
  
export interface DeviceDataTableProps {
    data: DeviceData[];
    columns: any[];
    onView: (row: any) => void;
    onEdit: (row: any) => void;
    onDelete: (row: any) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
}