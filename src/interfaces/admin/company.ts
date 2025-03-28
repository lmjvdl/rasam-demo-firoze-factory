interface Company {
    id: number;
    name: string;
    description: string | null;
    code: string;
    logo: string | null | undefined;
}


interface CompanyTableProps {
    data: Company[];
    columns: any[];
    onView: (row: any) => void;
    onEdit: (row: any) => void;
    onDelete: (row: any) => void;
    handleUsersView: (companyId: number) => void;
    selectedCompanyId: number | null;
    viewUsersOpen: boolean;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
}

