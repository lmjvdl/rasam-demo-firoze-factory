"use client";

import React, { useEffect, useState } from "react";
import getCompanyList, { ResponseSchema } from "./useView";
import useClientPagination from "@/hooks/UI/useClientPagination";
import useDelete from "./useDelete";
import useUpdate from "./useUpdate";
import getCompanyUserList from "./useUserView";
import ViewUserModalDialog from "@/components/AdminPanelComponent/ViewProcess/ViewUserModal";
import CompanyTable from "./companyTable";
import ViewDialog from "@/components/AdminPanelComponent/ViewProcess/ViewDialog";
import EditDialog from "@/components/AdminPanelComponent/ViewProcess/EditDialog";
import DeleteDialog from "@/components/AdminPanelComponent/ViewProcess/DeleteDialog";
import { columns } from "./columnsData";

const AllContentCompany: React.FC = () => {
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
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(
    null
  );
  const [viewOpen, setViewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [viewUsersOpen, setViewUsersOpen] = useState(false);
  const [userList, setUserList] = useState<{ id: number; user: number }[]>([]);

  const { deleteCompanyMutation } = useDelete();
  const { updateCompanyMutation } = useUpdate();

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
  const getUserList = getCompanyUserList();

  useEffect(() => {
    getList.mutate(undefined, {
      onSuccess: (information) => {
        setData(information);
      },
    });
  }, [pageNumber]);

  useEffect(() => {
    if (viewUsersOpen && selectedCompanyId) {
      getUserList.mutate(selectedCompanyId, {
        onSuccess: (data) => {
          setUserList(data?.data?.results || []);
        },
      });
    }
  }, [viewUsersOpen, selectedCompanyId]);

  const handleSaveEdit = (updatedRow: {
    id: number;
    name: string;
    description: string;
    code: string;
    logo: string;
  }) => {
    setData((prevData) => {
      if (prevData?.data) {
        updateCompanyMutation.mutate(updatedRow);
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
      return (
        prevData || {
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
        }
      );
    });
  };

  const handleUsersView = (companyId: number) => {
    setSelectedCompanyId(companyId);
    setViewUsersOpen(true);
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
      deleteCompanyMutation.mutate(selectedRow.id);
      setDeleteOpen(false);
    }
  };

  const dynamicColumns = columns(
    handleUsersView,
    selectedCompanyId,
    viewUsersOpen,
    userList
  );
  const filteredComumnsForEdit = dynamicColumns.filter((col) => col.canEdit);

  return (
    <>
      <CompanyTable
        data={data?.data?.results ?? []}
        columns={dynamicColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        handleUsersView={handleUsersView}
        selectedCompanyId={selectedCompanyId}
        userList={userList}
        viewUsersOpen={viewUsersOpen}
        page={pageNumber}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <ViewDialog
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        rowData={selectedRow}
        titles={dynamicColumns}
      />
      <EditDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={handleSaveEdit}
        rowData={selectedRow}
        titles={filteredComumnsForEdit}
      />
      <DeleteDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        rowData={selectedRow}
        titles={dynamicColumns}
      />
      <ViewUserModalDialog
        open={viewUsersOpen}
        onClose={() => setViewUsersOpen(false)}
        companyId={selectedCompanyId}
      />
    </>
  );
};

export default AllContentCompany;
