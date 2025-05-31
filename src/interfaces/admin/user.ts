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
    position: { id: number; name: string } | null;
    product_lines: { id: number; name: string }[] | [];
  }

export interface UserTableProps {
    data: User[];
    columns: any[];
    onView: (row: User) => void;
    onEdit: (row: User) => void;
    onDelete: (row: User) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
}
