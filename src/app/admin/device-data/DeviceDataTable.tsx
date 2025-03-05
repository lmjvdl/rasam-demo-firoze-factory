import React from "react";
import DataTable from "@/components/AdminPanelComponent/ViewProcess/DataTable";
import { DeviceDataTableProps } from "@/interfaces/admin/deviceData";

const DeviceDataTable: React.FC<DeviceDataTableProps> = ({
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

export default DeviceDataTable;
