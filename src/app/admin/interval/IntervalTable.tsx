import React from "react";
import { IntervalTableProps } from "@/interfaces/admin/interval";
import DataTable from "@/components/adminPanelComponent/viewProcess/DataTable";

const IntervalTable: React.FC<IntervalTableProps> = ({
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

export default IntervalTable;
