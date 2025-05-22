"use client";

import React, { useEffect, useState } from "react";
import useDelete from "./hooks/useDelete";
import getOperationList, { ResponseSchema } from "./hooks/useView";
import ViewDialog from "@/components/adminPanelComponent/viewProcess/ViewDialog";
import EditDialog from "@/components/adminPanelComponent/viewProcess/EditDialog";
import DeleteDialog from "@/components/adminPanelComponent/viewProcess/DeleteDialog";
import { PrevDataInitial } from "@/interfaces/general/general";
import { columns } from "./ColumnsData";
import { OperationUpdateSchema } from "./hooks/useUpdate";
import OperationTable from "./OperationTable";
import useUpdate from "./hooks/useUpdate";
import useDeviceQuery from "./hooks/useDeviceList";
import useDataQuery from "@/hooks/adminDataQuery/useDataQuery";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import dataTypeUrls from "@/utils/url/adminPanel/dataTypeUrl";

const AllContentOperation: React.FC = () => {
  const [data, setData] = useState<ResponseSchema>(PrevDataInitial);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);
  const [nextPage, setNextPage] = useState<null | string>(null);

  const getList = getOperationList(pageNumber, 8, nextPage);
  const { deleteOperationMutation } = useDelete();
  const { updateOperationMutation } = useUpdate();

  const deviceList = useDeviceQuery().data
    ? useDeviceQuery().data.map((device) => ({
        id: device.id,
        value: device.id,
        label: device.name,
      }))
    : [];

  const dataTypeList = useDataQuery(
    allQueryKeys.adminPanel.operation.data_type_list,
    dataTypeUrls.listDataType
  ).data
    ? useDataQuery(
        allQueryKeys.adminPanel.operation.data_type_list,
        dataTypeUrls.listDataType
      ).data.map((dataType) => ({
        id: dataType.id,
        value: dataType.id,
        label: dataType.name,
      }))
    : [];

  const dataTypeMap = new Map(
    dataTypeList.map((item) => [item.id, item.label])
  );

  useEffect(() => {
    if (getList.isSuccess && getList.data) {
      const updatedResults = getList.data.data.results.map((row: any) => {
        if (row.datatype_operation && row.isKeyValObject) {
          const mappedDatatypeOperation: Record<string, string> = {};

          Object.entries(row.datatype_operation).forEach(([key, value]) => {
            const label = dataTypeMap.get(Number(key));
            if (label) {
              mappedDatatypeOperation[label] = value as string;
            }
          });

          return {
            ...row,
            datatype_operation: mappedDatatypeOperation,
          };
        }

        return row;
      });

      setData({
        ...getList.data,
        data: {
          ...getList.data.data,
          results: updatedResults,
        },
      });
      setTotalData(getList.data.data.count);
      setNextPage(getList.data.data.next);
    }
  }, []);

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

  const handleSaveEdit = (updatedRow: OperationUpdateSchema) => {
    setData((prevData) => {
      if (prevData?.data) {
        updateOperationMutation.mutate(updatedRow);

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
      deleteOperationMutation.mutate(selectedRow.id, {
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
      <OperationTable
        data={data?.data?.results ?? []}
        columns={dynamicColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        page={pageNumber}
        count={totalData}
        onPageChange={handlePagination}
        dataTypeMap={dataTypeMap}
      />

      <ViewDialog
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        rowData={selectedRow}
        titles={dynamicColumns}
        arrayAttributes={{
          devices: "name",
        }}
        objectAttributes={["device"]}
        keyObjectValMap={dataTypeMap}
      />
      <EditDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={handleSaveEdit}
        rowData={selectedRow}
        titles={filteredColumnsForEdit}
        extraOptions={{ deviceList }}
        arrayObjectAttributes={["devices"]}
        objectAttributes={["device"]}
      />
      <DeleteDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        rowData={selectedRow}
        titles={dynamicColumns}
      />
    </>
  );
};

export default AllContentOperation;
