import React from "react";
import { PositionTableProps } from "@/interfaces/admin/position";
import DataTable from "@/components/adminPanelComponent/viewProcess/DataTable";

const PositionTable: React.FC<PositionTableProps> = ({
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

export default PositionTable;
