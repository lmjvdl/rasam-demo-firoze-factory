import { TitlesColumnsData } from "./general";

export interface Company {
    id: number;
    name: string;
    description: string | null;
    code: string;
    light_logo: string | null | undefined;
    dark_logo: string | null | undefined;
}


export interface CompanyTableProps {
    data: Company[];
    columns: TitlesColumnsData[];
    onView: (row: Company) => void;
    onEdit: (row: Company) => void;
    onDelete: (row: Company) => void;
    handleUsersView: (companyId: number) => void;
    selectedCompanyId: number | null;
    viewUsersOpen: boolean;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
}

