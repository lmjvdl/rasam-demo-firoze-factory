interface Contacts {
    id: number; // ReadOnly
    name: string;
    phone_number: string;
}
  
  
export interface ContactsTableProps {
    data: Contacts[];
    columns: any[];
    onView: (row: any) => void;
    onEdit: (row: any) => void;
    onDelete: (row: any) => void;
    count: number;
    page: number; 
    onPageChange: (newPage: number) => void;
}