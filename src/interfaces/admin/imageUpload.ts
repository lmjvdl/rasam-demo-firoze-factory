export interface ImageUpload {
    id: number;
    icon: string;
    uploaded_at: string;
}

export interface ImageUploadTableProps {
    data: ImageUpload[];
    columns: any[];
    onDelete: (row: any) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
}
