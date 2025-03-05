import React from "react";
import DataTable from "@/components/AdminPanelComponent/ViewProcess/DataTable";
import { PermissionTableProps } from "@/interfaces/admin/permission";

const PermissionTable: React.FC<PermissionTableProps> = ({
  data,
  columns,
  onView,
  count,
  page,
  onPageChange,
}) => {

  return (
    <DataTable
      columns={columns}
      data={data}
      onView={onView}
      count={count}
      onPageChange={onPageChange}
      page={page}
    />
  );
};

export default PermissionTable;
