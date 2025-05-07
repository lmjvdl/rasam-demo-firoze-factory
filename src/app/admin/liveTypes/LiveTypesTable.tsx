import React from "react";
import { LiveTypesTableProps } from "@/interfaces/admin/liveTypes";
import DataTable from "@/components/adminPanelComponent/viewProcess/DataTable";

const LiveTypesTable: React.FC<LiveTypesTableProps> = ({
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

export default LiveTypesTable;
