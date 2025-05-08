export interface User {
    id: number;
    username: string;
    phone_number: string;
    email: string;
    first_name: string;
    national_code: string | null;
    last_name: string;
    groups: {
      id: number;
      name: string;
    }[] | [];
    is_active: boolean;
    product_lines: { id: number; name: string }[] | [];
  }

export interface UserTableProps {
    data: User[];
    columns: any[];
    onView: (row: any) => void;
    onEdit: (row: any) => void;
    onDelete: (row: any) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
}
