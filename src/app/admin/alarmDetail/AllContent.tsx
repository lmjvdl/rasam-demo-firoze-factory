"use client";

import React, { useEffect, useState } from "react";
import useAlarmDetailList, { ResponseSchema } from "./hooks/useView";
import useDelete from "./hooks/useDelete";
import { columns } from "./ColumnsData";
import { AlarmDetailUpdateSchema } from "./hooks/useUpdate";
import AlarmDetailTable from "./AlarmDetailTable";
import useUpdate from "./hooks/useUpdate";
import ViewDialog from "@/components/adminPanelComponent/viewProcess/ViewDialog";
import EditDialog from "@/components/adminPanelComponent/viewProcess/EditDialog";
import DeleteDialog from "@/components/adminPanelComponent/viewProcess/DeleteDialog";
import { useAlarmDetailExtraOptions } from "./hooks/useAlarmDetailExtraOptions";
import { AlarmDetail } from "@/interfaces/admin/alarmDetail";
import { PrevDataInitial } from "@/interfaces/user/general/general";

const AllContentAlarmDetail: React.FC = () => {
  const [data, setData] = useState<ResponseSchema>(PrevDataInitial);
  const [selectedRow, setSelectedRow] = useState<AlarmDetail>();
  const [viewOpen, setViewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);
  const [nextPage, setNextPage] = useState<null | string>(null);

  const { alarmList, parameterList } = useAlarmDetailExtraOptions();

  const getList = useAlarmDetailList(pageNumber, 8, nextPage);
  const { deleteAlarmDetailMutation } = useDelete();
  const { updateAlarmDetailMutation } = useUpdate();

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

  const handleSaveEdit = (updatedRow: AlarmDetailUpdateSchema) => {
    setData((prevData) => {
      if (prevData?.data) {
        updateAlarmDetailMutation.mutate(updatedRow);

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

  const handleView = (row: AlarmDetail) => {
    setSelectedRow(row);
    setViewOpen(true);
  };

  const handleEdit = (row: AlarmDetail) => {
    setSelectedRow(row);
    setEditOpen(true);
  };

  const handleDelete = (row: AlarmDetail) => {
    setSelectedRow(row);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedRow?.id) {
      deleteAlarmDetailMutation.mutate(selectedRow.id, {
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
      <AlarmDetailTable
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
        objectAttributes={["alarm_info", "parameter_info"]}
      />
      <EditDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={handleSaveEdit}
        rowData={selectedRow}
        titles={filteredColumnsForEdit}
        extraOptions={{ alarmList, parameterList }}
        objectAttributes={["alarm", "parameter"]}
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

export default AllContentAlarmDetail;