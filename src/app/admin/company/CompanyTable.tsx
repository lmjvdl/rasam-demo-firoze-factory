import React from "react";
import DataTable from "@/components/adminPanelComponent/viewProcess/DataTable";
import UserActions from "./user/page";

const CompanyTable: React.FC<CompanyTableProps> = ({
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
        ...col,
        render: (row: any) => <UserActions companyId={row.id} />
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
