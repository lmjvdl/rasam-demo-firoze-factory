import React from "react";
import DataTable from "@/components/adminPanelComponent/viewProcess/DataTable";
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

  return (
    <DataTable
      columns={columns}
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
