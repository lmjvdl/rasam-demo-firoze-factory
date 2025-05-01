import React from "react";
import DataTable from "@/components/adminPanelComponent/viewProcess/DataTable";
import { DataTypeTableProps } from "@/interfaces/admin/dataType";

const DataTypeTable: React.FC<DataTypeTableProps> = ({
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

export default DataTypeTable;
