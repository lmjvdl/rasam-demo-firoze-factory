import React from "react";
import DataTable from "@/components/adminPanelComponent/viewProcess/DataTable";
import { SmsLogTableProps } from "@/interfaces/admin/smsLog";

const SmsLogTable: React.FC<SmsLogTableProps> = ({
  data,
  columns,
  onView,
  count,
  page,
  onPageChange,
}) => {

  return (
    <DataTable
      columns={columns}
      data={data}
      onView={onView}
      count={count}
      onPageChange={onPageChange}
      page={page}
    />
  );
};

export default SmsLogTable;
