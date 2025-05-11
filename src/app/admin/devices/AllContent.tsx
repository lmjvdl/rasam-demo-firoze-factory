"use client";

import React, { useEffect, useState } from "react";
import getDeviceList, { ResponseSchema } from "./hooks/useView";
import useDelete from "./hooks/useDelete";
import ViewDialog from "@/components/adminPanelComponent/viewProcess/ViewDialog";
import EditDialog from "@/components/adminPanelComponent/viewProcess/EditDialog";
import DeleteDialog from "@/components/adminPanelComponent/viewProcess/DeleteDialog";
import { PrevDataInitial } from "@/interfaces/general/general";
import { columns } from "./ColumnsData";
import { DeviceUpdateSchema } from "./hooks/useUpdate";
import DeviceTable from "./DeviceTable";
import useUpdate from "./hooks/useUpdate";
import useDataQuery from "@/hooks/adminDataQuery/useDataQuery";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import dataTypeUrls from "@/utils/url/adminPanel/dataTypeUrl";
import productLinePartUrls from "@/utils/url/adminPanel/productLinePartUrl";

const AllContentDevice: React.FC = () => {
  const [data, setData] = useState<ResponseSchema>(PrevDataInitial);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);
  const [nextPage, setNextPage] = useState<null | string>(null);

  const getList = getDeviceList(pageNumber, 8, nextPage);
  const { deleteDeviceMutation } = useDelete();
  const { updateDeviceMutation } = useUpdate();

  const dataTypeList = useDataQuery(
    allQueryKeys.adminPanel.devices.data_type_list,
    dataTypeUrls.listDataType
  ).data
    ? useDataQuery(
        allQueryKeys.adminPanel.devices.data_type_list,
        dataTypeUrls.listDataType
      ).data.map((device) => ({
        id: device.id,
        value: device.id,
        label: device.name,
      }))
    : [];

  const productLinePartList = useDataQuery(
    allQueryKeys.adminPanel.devices.product_line_part_list,
    productLinePartUrls.listProductLinePart
  ).data
    ? useDataQuery(
        allQueryKeys.adminPanel.devices.product_line_part_list,
        productLinePartUrls.listProductLinePart
      ).data.map((product_line_part) => ({
        id: product_line_part.id,
        value: product_line_part.id,
        label: product_line_part.name,
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

  const handleSaveEdit = (updatedRow: DeviceUpdateSchema) => {
    setData((prevData) => {
      if (prevData?.data) {
        updateDeviceMutation.mutate(updatedRow);

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
      deleteDeviceMutation.mutate(selectedRow.id, {
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
      <DeviceTable
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
        arrayAttributes={{ data_type: "name" }}
        objectAttributes={["product_line_part", "on_off_identifier"]}
      />
      <EditDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={handleSaveEdit}
        rowData={selectedRow}
        titles={filteredColumnsForEdit}
        arrayObjectAttributes={["data_type"]}
        objectAttributes={["product_line_part", "on_off_identifier"]}
        extraOptions={{ dataTypeList, productLinePartList }}
      />
      <DeleteDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        rowData={selectedRow}
        titles={dynamicColumns}
        arrayAttributes={{ data_type: "name" }}
        objectAttributes={["product_line_part", "on_off_identifier"]}
      />
    </>
  );
};

export default AllContentDevice;
