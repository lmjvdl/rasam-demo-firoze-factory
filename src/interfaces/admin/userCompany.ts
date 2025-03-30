export interface UserCompany {
    id: number;
    user: string;
    company: string;
    groups: { id: number; name: string }[] | [];
    permissions: { id: number; name: string }[] | [];
}


export interface UserCompanyTableProps {
    data: UserCompany[];
    columns: any[];
    onView: (row: any) => void;
    onEdit: (row: any) => void;
    onDelete: (row: any) => void;
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