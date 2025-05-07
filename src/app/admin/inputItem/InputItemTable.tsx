import React from "react";
import { InputItemTableProps } from "@/interfaces/admin/inputItem";
import DataTable from "@/components/adminPanelComponent/viewProcess/DataTable";

const InputItemTable: React.FC<InputItemTableProps> = ({
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

export default InputItemTable;
