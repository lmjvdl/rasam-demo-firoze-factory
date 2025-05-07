"use client";

import React, { useEffect, useState } from "react";
import getAlarmList, { ResponseSchema } from "./hooks/useView";
import useDelete from "./hooks/useDelete";
import { PrevDataInitial } from "@/interfaces/general/general";
import { columns } from "./ColumnsData";
import { AlarmUpdateSchema } from "./hooks/useUpdate";
import AlarmTable from "./AlarmTable";
import useUpdate from "./hooks/useUpdate";
import ViewDialog from "@/components/adminPanelComponent/viewProcess/ViewDialog";
import EditDialog from "@/components/adminPanelComponent/viewProcess/EditDialog";
import DeleteDialog from "@/components/adminPanelComponent/viewProcess/DeleteDialog";
import useDataQuery from "@/hooks/adminDataQuery/useDataQuery";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import functionUrls from "@/utils/url/adminPanel/functionUrl";
import deviceUrls from "@/utils/url/adminPanel/deviceUrl";
import contactsUrls from "@/utils/url/adminPanel/contactUrl";
import dataTypeUrls from "@/utils/url/adminPanel/dataTypeUrl";

const AllContentAlarm: React.FC = () => {
  const [data, setData] = useState<ResponseSchema>(PrevDataInitial);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);
  const [nextPage, setNextPage] = useState<null | string>(null);

  const getList = getAlarmList(pageNumber, 8, nextPage);
  const { deleteAlarmMutation } = useDelete();
  const { updateAlarmMutation } = useUpdate();

  const functionList = useDataQuery(
    allQueryKeys.adminPanel.alarm.function_list,
    functionUrls.listFunction
  ).data
    ? useDataQuery(
        allQueryKeys.adminPanel.alarm.function_list,
        functionUrls.listFunction
      ).data.map((func) => ({
        id: func.id,
        value: func.id,
        label: func.name,
      }))
    : [];

  const deviceList = useDataQuery(
    allQueryKeys.adminPanel.alarm.device_list,
    deviceUrls.listDevice
  ).data
    ? useDataQuery(
        allQueryKeys.adminPanel.alarm.device_list,
        deviceUrls.listDevice
      ).data.map((device) => ({
        id: device.id,
        value: device.id,
        label: device.name,
      }))
    : [];

  const dataTypeList = useDataQuery(
    allQueryKeys.adminPanel.alarm.data_type_list,
    dataTypeUrls.listDataType
  ).data
    ? useDataQuery(
        allQueryKeys.adminPanel.alarm.data_type_list,
        dataTypeUrls.listDataType
      ).data.map((dataType) => ({
        id: dataType.id,
        value: dataType.id,
        label: dataType.name,
      }))
    : [];

  const contactsList = useDataQuery(
    allQueryKeys.adminPanel.alarm.contacts_list,
    contactsUrls.listContacts
  ).data
    ? useDataQuery(
        allQueryKeys.adminPanel.alarm.contacts_list,
        contactsUrls.listContacts
      ).data.map((contact) => ({
        id: contact.id,
        value: contact.id,
        label: contact.name,
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

  const handleSaveEdit = (updatedRow: AlarmUpdateSchema) => {
    setData((prevData) => {
      if (prevData?.data) {
        updateAlarmMutation.mutate(updatedRow);

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
      deleteAlarmMutation.mutate(selectedRow.id, {
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
      <AlarmTable
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
        objectAttributes={[
          "function_info",
          "device_info",
          "type_info",
          "receiver_info",
        ]}
      />
      <EditDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={handleSaveEdit}
        rowData={selectedRow}
        titles={filteredColumnsForEdit}
        extraOptions={{ functionList, deviceList, dataTypeList, contactsList }}
        objectAttributes={[
          "function_info",
          "device_info",
          "type_info",
          "receiver_info",
        ]}
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

export default AllContentAlarm;
