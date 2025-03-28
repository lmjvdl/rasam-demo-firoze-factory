import React from "react";
import DataTable from "@/components/adminPanelComponent/viewProcess/DataTable";
import { UserCompanyTableProps } from "@/interfaces/admin/userCompany";

const UserCompanyTable: React.FC<UserCompanyTableProps> = ({
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

export default UserCompanyTable;
