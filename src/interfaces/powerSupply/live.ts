export interface DataType {
    device_id: number;
    device_name_fa: string;
    allowed_data: { [key: string]: string };
    data: { [key: string]: number }[];
}
  
export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}