"use client";

import DataTable from "@/components/AdminPanelComponent/ViewProcess/DataTable";
import DeleteDialog from "@/components/AdminPanelComponent/ViewProcess/DeleteDialog";
import EditDialog from "@/components/AdminPanelComponent/ViewProcess/EditDialog";
import ViewDialog from "@/components/AdminPanelComponent/ViewProcess/ViewDialog";
import React, { useEffect, useState } from "react";
import getCompanyList, { ResponseSchema } from "./useView";
import useClientPagination from "@/hooks/UI/useClientPagination";
import useDelete from "./useDelete";

const columns = [
  { id: "id", label: "شناسه", showOnTable: true },
  { id: "name", label: "شرکت", showOnTable: true },
  { id: "description", label: "توضیحات", showOnTable: true },
  { id: "code", label: "کد", showOnTable: true },
  { id: "logo", label: "لوگو", isActionColumn: false, showOnTable: false },
  { id: "actions", label: "عملیات", isActionColumn: true },
];

const AllContentCompany: React.FC = () => {
  const { deleteCompanyMutation } = useDelete();
  
  const [data, setData] = useState<ResponseSchema>({
    data: {
      count: 0,
      next: null,
      previous: null,
      page_size: 8,
      results: [],
    },
    status_code: 200,
    success: true,
    messages: "",
  });

  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [updaterTable, setUpdatedTable] = useState(false);
  const {
    pageNumber,
    totalPages,
    hasNextPage,
    hasPerviousPage,
    setPage,
    next,
    previous,
    last,
    first,
  } = useClientPagination(data?.data?.count ?? 0);

  const getList = getCompanyList(pageNumber, 8);

  useEffect(() => {
    getList.mutate(undefined, {
      onSuccess: (information) => {
        setData(information);
      },
    });
  }, [pageNumber, updaterTable]);

  const filteredColumns = columns.filter(
    (col) => col.showOnTable || col.isActionColumn
  );

  const handleView = (row: any) => {
    setSelectedRow(row);
    setViewOpen(true);
  };

  const handleEdit = (row: any) => {
    setSelectedRow(row);
    setEditOpen(true);
    setUpdatedTable(true);
  };

  const handleDelete = (row: any) => {
    setSelectedRow(row);
    setDeleteOpen(true);
    setUpdatedTable(true);
  };

  const handleSaveEdit = (updatedRow: { id: number; name: string; description: string; code: string; logo: string; }) => {
    setUpdatedTable(true);
    setData((prevData) => {
      if (prevData?.data) {
        return {
          ...prevData,
          data: {
            ...prevData.data,
            results: prevData.data.results.map((row) =>
              row.id === updatedRow.id ? updatedRow : row
            ),
          },
        };
      }
      return prevData || {
        data: {
          count: 0,
          next: null,
          previous: null,
          page_size: 8,
          results: [],
        },
        status_code: 200,
        success: true,
        messages: "",
      };
    });
  };

  const handleConfirmDelete = () => {
    setUpdatedTable(true);
    if (selectedRow?.id) {
      deleteCompanyMutation.mutate(selectedRow.id);
    }
  };

  return (
    <div>
      <DataTable
        columns={filteredColumns}
        data={data?.data?.results ?? []}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <ViewDialog
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        rowData={selectedRow}
        titles={columns}
      />
      <EditDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={handleSaveEdit}
        rowData={selectedRow}
        titles={columns}
      />
      <DeleteDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        rowData={selectedRow}
        titles={columns}
      />
    </div>
  );
};

export default AllContentCompany;
