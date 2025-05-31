export interface DeviceData {
    id: number; // ReadOnly
    device: number;
    data_type: number[];
}
  
export interface DeviceDataTableProps {
    data: DeviceData[];
    columns: any[];
    onView: (row: DeviceData) => void;
    onEdit: (row: DeviceData) => void;
    onDelete: (row: DeviceData) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
}