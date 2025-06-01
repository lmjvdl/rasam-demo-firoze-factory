"use client";

import React, { useEffect, useState } from "react";
import useReportList, { ResponseSchema } from "./hooks/useView";
import useDelete from "./hooks/useDelete";
import ViewDialog from "@/components/adminPanelComponent/viewProcess/ViewDialog";
import EditDialog from "@/components/adminPanelComponent/viewProcess/EditDialog";
import DeleteDialog from "@/components/adminPanelComponent/viewProcess/DeleteDialog";
import { PrevDataInitial } from "@/interfaces/user/general/general";
import { columns } from "./ColumnsData";
import ReportTable from "./ReportTable";
import useUpdate, { ReportUpdateSchema } from "./hooks/useUpdate";
import { useReportExtraOptions } from "./hooks/useReportExtraOptions";
import { Report } from "@/interfaces/admin/report";

const AllContentReport: React.FC = () => {
  const [data, setData] = useState<ResponseSchema>(PrevDataInitial);
  const [selectedRow, setSelectedRow] = useState<Report>();
  const [viewOpen, setViewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);
  const [nextPage, setNextPage] = useState<null | string>(null);

  const { inputItemsList, outputItemList, intervalsList, productLinePartList } = useReportExtraOptions();

  const getList = useReportList(pageNumber, 8, nextPage);
  const { deleteReportMutation } = useDelete();
  const { updateReportMutation } = useUpdate();

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

  const handleSaveEdit = (updatedRow: ReportUpdateSchema) => {
    setData((prevData) => {
      if (prevData?.data) {
        updateReportMutation.mutate(updatedRow);

        return {
          ...prevData,
          data: {
            ...prevData.data,
            results: prevData.data.results.map((row) =>
              row.id === updatedRow.id ? { ...row, ...updatedRow } : row
            ),
          },
        };
      }
      return prevData || PrevDataInitial;
    });
  };

  const handlePagination = (newPage: number) => {
    setPageNumber(newPage);
    getList.mutate({ page: newPage + 1, page_size: 8, url: nextPage });
  };

  const handleView = (row: Report) => {
    setSelectedRow(row);
    setViewOpen(true);
  };

  const handleEdit = (row: Report) => {
    setSelectedRow(row);
    setEditOpen(true);
  };

  const handleDelete = (row: Report) => {
    setSelectedRow(row);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedRow?.id) {
      deleteReportMutation.mutate(selectedRow.id, {
        onSuccess: () => {
          setData((prevData) => {
            if (prevData?.data) {
              return {
                ...prevData,
                data: {
                  ...prevData.data,
                  results: prevData.data.results.filter(
                    (row) => row.id !== selectedRow.id
                  ),
                  count: prevData.data.count - 1,
                },
              };
            }
            return prevData;
          });
          setDeleteOpen(false);
        },
      });
    }
  };

  const dynamicColumns = columns();
  const filteredColumnsForEdit = dynamicColumns.filter((col) => col.canEdit);

  return (
    <>
      <ReportTable
        data={data?.data?.results ?? []}
        columns={dynamicColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        page={pageNumber}
        count={totalData}
        onPageChange={handlePagination}
      />

      <ViewDialog
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        rowData={selectedRow}
        titles={dynamicColumns}
        arrayAttributes={{
          input_items_info: "name",
          intervals_info: "name",
          output_item_info: "name"
        }}
        objectAttributes={[ "product_line_part_info" ]}
      />
      <EditDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={handleSaveEdit}
        rowData={selectedRow}
        titles={filteredColumnsForEdit}
        extraOptions={{
          inputItemsList,
          outputItemList,
          intervalsList,
          productLinePartList,
        }}
        objectAttributes={[ "product_line_part" ]}
        arrayObjectAttributes={[ "input_items", "intervals", "output_item" ]}
      />
      <DeleteDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        rowData={selectedRow}
        titles={dynamicColumns}
        arrayAttributes={{
          input_items_info: "name",
          intervals_info: "name",
          output_item_info: "name"
        }}
      />
    </>
  );
};

export default AllContentReport;