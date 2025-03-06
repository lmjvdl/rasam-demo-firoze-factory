"use client";

import React, { useEffect, useState } from "react";
import getPermissionList, { ResponseSchema } from "./hooks/useView";
import ViewDialog from "@/components/AdminPanelComponent/ViewProcess/ViewDialog";
import { PrevDataInitial } from "@/interfaces/general/general";
import { columns } from "./ColumnsData";
import PermissionTable from "./PermissionTable";

const AllContentPermission: React.FC = () => {
  const [data, setData] = useState<ResponseSchema>(PrevDataInitial);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);
  const [nextPage, setNextPage] = useState<null | string>(null);

  const getList = getPermissionList(pageNumber, 8, nextPage);

  useEffect(() => {
    getList.mutate(
      { page: pageNumber + 1, page_size: 8, url: nextPage },
      {
        onSuccess: (information) => {
          setData(information);
          setTotalData(information.data.count);
          setNextPage(information.data.next);
        },
      }
    );
  }, [pageNumber]);


  const handlePagination = (newPage: number) => {
    setPageNumber(newPage);
    getList.mutate({ page: newPage + 1, page_size: 8, url: nextPage });
  };

  const handleView = (row: any) => {
    setSelectedRow(row);
    setViewOpen(true);
  };

  const dynamicColumns = columns();

  return (
    <>
      <PermissionTable
        data={data?.data?.results ?? []}
        columns={dynamicColumns}
        onView={handleView}
        page={pageNumber}
        count={totalData}
        onPageChange={handlePagination}
      />

      <ViewDialog
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        rowData={selectedRow}
        titles={dynamicColumns}
      />
    </>
  );
};

export default AllContentPermission;
