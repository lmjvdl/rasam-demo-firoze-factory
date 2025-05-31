"use client";

import React, { useEffect, useState } from "react";
import getIntervalList, { ResponseSchema } from "./hooks/useView";
import useDelete from "./hooks/useDelete";
import { PrevDataInitial } from "@/interfaces/general/general";
import { columns } from "./ColumnsData";
import { InputItemUpdateSchema } from "./hooks/useUpdate";
import InputItemTable from "./InputItemTable";
import useUpdate from "./hooks/useUpdate";
import ViewDialog from "@/components/adminPanelComponent/viewProcess/ViewDialog";
import EditDialog from "@/components/adminPanelComponent/viewProcess/EditDialog";
import DeleteDialog from "@/components/adminPanelComponent/viewProcess/DeleteDialog";
import { InputItem } from "@/interfaces/admin/inputItem";

const AllContentInputItems: React.FC = () => {
  const [data, setData] = useState<ResponseSchema>(PrevDataInitial);
  const [selectedRow, setSelectedRow] = useState<InputItem>();
  const [viewOpen, setViewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);
  const [nextPage, setNextPage] = useState<null | string>(null);

  const getList = getIntervalList(pageNumber, 8, nextPage);
  const { deleteInputItemMutation } = useDelete();
  const { updateInputItemMutation } = useUpdate();


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

  const handleSaveEdit = (updatedRow: InputItemUpdateSchema) => {
    setData((prevData) => {
      if (prevData?.data) {
        updateInputItemMutation.mutate(updatedRow);

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

  const handleView = (row: InputItem) => {
    setSelectedRow(row);
    setViewOpen(true);
  };

  const handleEdit = (row: InputItem) => {
    setSelectedRow(row);
    setEditOpen(true);
  };

  const handleDelete = (row: InputItem) => {
    setSelectedRow(row);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedRow?.id) {
      deleteInputItemMutation.mutate(selectedRow.id, {
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
      setSelectedRow((prevSelectedRow: InputItemUpdateSchema | undefined) => {
        if (prevSelectedRow) {
          return {
            ...prevSelectedRow,
            required: value,
          };
        }
        return prevSelectedRow;
      });
    };

  const dynamicColumns = columns();
  const filteredColumnsForEdit = dynamicColumns.filter((col) => col.canEdit);

  return (
    <>
      <InputItemTable
        data={data?.data?.results ?? []}
        columns={dynamicColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        page={pageNumber}
        count={totalData}
        onPageChange={handlePagination}
        booleanAttributeName="required"
        falseLabel="غیرضروری"
        trueLabel="ضروری"
      />

      <ViewDialog
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        rowData={selectedRow}
        titles={dynamicColumns}
        booleanAttributeName="required"
        falseLabel="ضروری نیست"
        trueLabel="ضروری است"
      />
      <EditDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={handleSaveEdit}
        rowData={selectedRow}
        titles={filteredColumnsForEdit}
        booleanAttributeName="required"
        booleanValue={selectedRow?.required}
        falseLabel="غیرضروری است"
        trueLabel="ضروری است"
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

export default AllContentInputItems;
