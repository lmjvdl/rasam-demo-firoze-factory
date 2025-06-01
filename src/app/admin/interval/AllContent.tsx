"use client";

import React, { useEffect, useState } from "react";
import getIntervalList, { ResponseSchema } from "./hooks/useView";
import useDelete from "./hooks/useDelete";
import { PrevDataInitial } from "@/interfaces/user/general/general";
import { columns } from "./ColumnsData";
import { IntervalUpdateSchema } from "./hooks/useUpdate";
import IntervalTable from "./IntervalTable";
import useUpdate from "./hooks/useUpdate";
import ViewDialog from "@/components/adminPanelComponent/viewProcess/ViewDialog";
import EditDialog from "@/components/adminPanelComponent/viewProcess/EditDialog";
import DeleteDialog from "@/components/adminPanelComponent/viewProcess/DeleteDialog";
import { Interval } from "@/interfaces/admin/interval";

const AllContentInterval: React.FC = () => {
  const [data, setData] = useState<ResponseSchema>(PrevDataInitial);
  const [selectedRow, setSelectedRow] = useState<Interval>();
  const [viewOpen, setViewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);
  const [nextPage, setNextPage] = useState<null | string>(null);

  const getList = getIntervalList(pageNumber, 8, nextPage);
  const { deleteIntervalMutation } = useDelete();
  const { updateIntervalMutation } = useUpdate();

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

  const handleSaveEdit = (updatedRow: IntervalUpdateSchema) => {
    setData((prevData) => {
      if (prevData?.data) {
        updateIntervalMutation.mutate(updatedRow);

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

  const handleView = (row: Interval) => {
    setSelectedRow(row);
    setViewOpen(true);
  };

  const handleEdit = (row: Interval) => {
    setSelectedRow(row);
    setEditOpen(true);
  };

  const handleDelete = (row: Interval) => {
    setSelectedRow(row);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedRow?.id) {
      deleteIntervalMutation.mutate(selectedRow.id, {
        onSuccess: () => {
          setData(prevData => {
            if (prevData?.data) {
              return {
                ...prevData,
                data: {
                  ...prevData.data,
                  results: prevData.data.results.filter(row => row.id !== selectedRow.id),
                  count: prevData.data.count - 1
                }
              };
            }
            return prevData;
          });
          setDeleteOpen(false);
        }
      });
    }
  };

  // Handling the boolean value change (is_active)
  const handleBooleanValueChange = (value: boolean) => {
    setSelectedRow((prevSelectedRow: IntervalUpdateSchema | undefined) => {
      if (prevSelectedRow) {
        return {
          ...prevSelectedRow,
          is_shift: value,
        };
      }
      return prevSelectedRow;
    });
  };


  const dynamicColumns = columns();
  const filteredColumnsForEdit = dynamicColumns.filter((col) => col.canEdit);

  return (
    <>
      <IntervalTable
        data={data?.data?.results ?? []}
        columns={dynamicColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        page={pageNumber}
        count={totalData}
        onPageChange={handlePagination}
        booleanAttributeName="is_shift"
        falseLabel="شیفت نیست"
        trueLabel="شیفت است"
      />

      <ViewDialog
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        rowData={selectedRow}
        titles={dynamicColumns}
        booleanAttributeName="is_shift"
        falseLabel="شیفت نیست"
        trueLabel="شیفت است"
      />
      <EditDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={handleSaveEdit}
        rowData={selectedRow}
        titles={filteredColumnsForEdit}
        booleanAttributeName="is_shift"
        booleanValue={selectedRow?.is_shift}
        falseLabel="شیفت نیست"
        trueLabel="شیفت است"
        onBooleanValueChange={handleBooleanValueChange}
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

export default AllContentInterval;
