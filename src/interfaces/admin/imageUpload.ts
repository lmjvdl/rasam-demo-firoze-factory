import { TitlesColumnsData } from "./general";

export interface ImageUpload {
    id: number;
    icon: string;
    uploaded_at: string;
    name: string;
    theme: string;
}

export interface ImageUploadTableProps {
    data: ImageUpload[];
    columns: TitlesColumnsData[];
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
}
