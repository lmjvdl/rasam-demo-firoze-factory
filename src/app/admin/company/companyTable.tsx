import React, { JSX, useState } from "react";
import { IconButton } from "@mui/material";
import { IconUserExclamation } from "@tabler/icons-react";
import DataTable from "@/components/AdminPanelComponent/ViewProcess/DataTable";

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
  count,
  page,
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
      count={count}
      onPageChange={onPageChange}
      page={page}
    />
  );
};

export default CompanyTable;
