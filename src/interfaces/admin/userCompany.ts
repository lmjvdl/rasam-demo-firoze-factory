import { TitlesColumnsData } from "./general";

export interface UserCompany {
    id: number;
    user: string;
    company: string;
    groups: { id: number; name: string }[] | [];
    permissions: { id: number; name: string }[] | [];
}


export interface UserCompanyTableProps {
    data: UserCompany[];
    columns: TitlesColumnsData[];
    onView: (row: UserCompany) => void;
    onEdit: (row: UserCompany) => void;
    onDelete: (row: UserCompany) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
}

export interface UserCompanyPageProps {
    companyId: number;
}

export interface PageProps {
    params: Promise<{ companyId: string }>;
}