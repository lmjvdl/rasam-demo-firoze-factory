import React from "react";
import DataTable from "@/components/adminPanelComponent/viewProcess/DataTable";
import { DeviceTableProps } from "@/interfaces/admin/device";

const DeviceTable: React.FC<DeviceTableProps> = ({
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

export default DeviceTable;
