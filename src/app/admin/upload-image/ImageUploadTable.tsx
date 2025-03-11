import React from "react";
import DataTable from "@/components/AdminPanelComponent/ViewProcess/DataTable";
import { ImageUploadTableProps } from "@/interfaces/admin/imageUpload";

const ImageUploadTable: React.FC<ImageUploadTableProps> = ({
  data,
  columns,
  count,
  page,
  onPageChange,
}) => {

  return (
    <DataTable
      columns={columns}
      data={data}
      count={count}
      onPageChange={onPageChange}
      page={page}
    />
  );
};

export default ImageUploadTable;
