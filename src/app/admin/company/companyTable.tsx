import React from "react";
import { IconButton } from "@mui/material";
import { IconUserExclamation } from "@tabler/icons-react";
import DataTable from "@/components/AdminPanelComponent/ViewProcess/DataTable";

interface CompanyTableProps {
  data: Company[];
  columns: any[];
  onView: (row: any) => void;
  onEdit: (row: any) => void;
  onDelete: (row: any) => void;
  handleUsersView: (companyId: number) => void;
  selectedCompanyId: number | null;
  userList: { id: number; user: number }[];
  viewUsersOpen: boolean;
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const CompanyTable: React.FC<CompanyTableProps> = ({
  data,
  columns,
  onView,
  onEdit,
  onDelete,
  handleUsersView,
  selectedCompanyId,
  userList,
  viewUsersOpen,
  page,
  totalPages,
  onPageChange,
}) => {
  const columnsWithUserActions = columns.map((col) => {
    if (col.id === "userActions") {
      return {
        ...col,
        render: (row: any) => (
          <>
            <IconButton onClick={() => handleUsersView(row.id)}>
              <IconUserExclamation />
            </IconButton>
            {selectedCompanyId === row.id && viewUsersOpen && (
              <div>
                <ul>
                  {userList.map((user) => (
                    <li key={user.id}>{user.user}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ),
      };
    }
    return col;
  });

  return (
    <DataTable
      columns={columnsWithUserActions}
      data={data}
      onView={onView}
      onEdit={onEdit}
      onDelete={onDelete}
      page={page}
      totalPages={totalPages}
      onPageChange={onPageChange}
    />
  );
};

export default CompanyTable;
