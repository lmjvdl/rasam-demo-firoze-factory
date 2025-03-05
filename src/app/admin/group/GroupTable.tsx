import React from "react";
import DataTable from "@/components/AdminPanelComponent/ViewProcess/DataTable";
import { UserTableProps } from "@/interfaces/admin/user";

const UserTable: React.FC<UserTableProps> = ({
  data,
  columns,
  onView,
  onEdit,
  onDelete,
  count,
  page,
  onPageChange,
}) => {
  const columnsWithUserActions = columns.map((col) => {
    if (col.id === "userActions") {
      return {
        ...col
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

export default UserTable;
