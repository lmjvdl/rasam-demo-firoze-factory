import React from "react";
import DataTable from "@/components/adminPanelComponent/viewProcess/DataTable";
import Link from "next/link";
import { IconButton } from "@mui/material";
import { IconUserExclamation } from "@tabler/icons-react";



const CompanyTable: React.FC<CompanyTableProps> = ({
  data,
  columns,
  onView,
  onEdit,
  onDelete,
  count,
  page,
  onPageChange,
}) => {
  const columnsWithUserActions = columns.map((col) => {
    if (col.id === "userActions") {
      return {
        ...col,
        render: (row: any) => (
          <Link href={`/admin/company/${row.id}/user`} passHref>
            <IconButton 
              aria-label="مشاهده کاربران شرکت"
              sx={{ color: "primary.main" }}
            >
              <IconUserExclamation stroke={2} />
            </IconButton>
          </Link>
        )
      };
    }
    return col;
  });

  return (
    <DataTable
      columns={columnsWithUserActions}
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

export default CompanyTable;
