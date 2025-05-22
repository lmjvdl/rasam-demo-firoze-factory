import React from "react";
import DataTable from "@/components/adminPanelComponent/viewProcess/DataTable";
import { OperationTableProps } from "@/interfaces/admin/operation";

const OperationTable: React.FC<OperationTableProps> = ({
  data,
  columns,
  onView,
  onEdit,
  onDelete,
  count,
  page,
  onPageChange,
  dataTypeMap,
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
      keyObjectValMap={dataTypeMap}
    />
  );
};

export default OperationTable;
