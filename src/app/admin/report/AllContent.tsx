"use client";

import React, { useEffect, useState } from "react";
import getReportList, { ResponseSchema } from "./hooks/useView";
import useDelete from "./hooks/useDelete";
import ViewDialog from "@/components/adminPanelComponent/viewProcess/ViewDialog";
import EditDialog from "@/components/adminPanelComponent/viewProcess/EditDialog";
import DeleteDialog from "@/components/adminPanelComponent/viewProcess/DeleteDialog";
import { PrevDataInitial } from "@/interfaces/general/general";
import { columns } from "./ColumnsData";
import ReportTable from "./ReportTable";
import useUpdate, { ReportUpdateSchema } from "./hooks/useUpdate";
import useDataQuery from "@/hooks/adminDataQuery/useDataQuery";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import inputItemsUrls from "@/utils/url/adminPanel/inputItemUrl";
import outputItemUrls from "@/utils/url/adminPanel/outputItemUrl";
import intervalUrls from "@/utils/url/adminPanel/intervalUrl";
import productLinePartUrls from "@/utils/url/adminPanel/productLinePartUrl";

const AllContentReport: React.FC = () => {
  const [data, setData] = useState<ResponseSchema>(PrevDataInitial);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);
  const [nextPage, setNextPage] = useState<null | string>(null);

  const getList = getReportList(pageNumber, 8, nextPage);
  const { deleteReportMutation } = useDelete();
  const { updateReportMutation } = useUpdate();

  const inputItemsList = useDataQuery(
    allQueryKeys.adminPanel.report.input_items_list,
    inputItemsUrls.listInputItem
  ).data
    ? useDataQuery(
        allQueryKeys.adminPanel.report.input_items_list,
        inputItemsUrls.listInputItem
      ).data.map((input) => ({
        id: input.id,
        value: input.id,
        label: input.name,
      }))
    : [];

  const outputItemList = useDataQuery(
    allQueryKeys.adminPanel.report.output_items_list,
    outputItemUrls.listOutputItem
  ).data
    ? useDataQuery(
        allQueryKeys.adminPanel.report.output_items_list,
        outputItemUrls.listOutputItem
      ).data.map((output) => ({
        id: output.id,
        value: output.id,
        label: output.name,
      }))
    : [];

  const intervalsList = useDataQuery(
    allQueryKeys.adminPanel.report.intervals_list,
    intervalUrls.listInterval
  ).data
    ? useDataQuery(
        allQueryKeys.adminPanel.report.intervals_list,
        intervalUrls.listInterval
      ).data.map((interval) => ({
        id: interval.id,
        value: interval.id,
        label: interval.name,
      }))
    : [];

  const productLinePartList = useDataQuery(
    allQueryKeys.adminPanel.report.product_line_part_list,
    productLinePartUrls.listProductLinePart
  ).data
    ? useDataQuery(
        allQueryKeys.adminPanel.report.product_line_part_list,
        productLinePartUrls.listProductLinePart
      ).data.map((productLinePart) => ({
        id: productLinePart.id,
        value: productLinePart.id,
        label: productLinePart.name,
      }))
    : [];

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

  const handleView = (row: any) => {
    setSelectedRow(row);
    setViewOpen(true);
  };

  const handleEdit = (row: any) => {
    setSelectedRow(row);
    setEditOpen(true);
  };

  const handleDelete = (row: any) => {
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
          input_items: "name",
          intervals: "name",
        }}
        objectAttributes={["product_line_part", "output_item"]}
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
        objectAttributes={["product_line_part", "output_item"]}
        arrayObjectAttributes={["input_items", "intervals"]}
      />
      <DeleteDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        rowData={selectedRow}
        titles={dynamicColumns}
        arrayAttributes={{
          input_items: "name",
          intervals: "name",
        }}
        objectAttributes={["product_line_part", "output_item"]}
      />
    </>
  );
};

export default AllContentReport;
