export interface Contacts {
    id: number; // ReadOnly
    name: string;
    phone_number: string;
    groups: { id: number; name: string }[] | [];
    user_permissions: { id: number; name: string }[] | [];
}
  
  
export interface ContactsTableProps {
    data: Contacts[];
    columns: any[];
    onView: (row: Contacts) => void;
    onEdit: (row: Contacts) => void;
    onDelete: (row: Contacts) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
}