import React from "react";
import { ShiftTableProps } from "@/interfaces/admin/shift";
import DataTable from "@/components/adminPanelComponent/viewProcess/DataTable";

const ShiftTable: React.FC<ShiftTableProps> = ({
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

export default ShiftTable;
