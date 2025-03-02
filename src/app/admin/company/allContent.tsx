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
  const [pageNumber, setPageNumber] = useState<number>(0);
  const { deleteCompanyMutation } = useDelete();
  const { updateCompanyMutation } = useUpdate();
  const [ totalData, setTotalData ] = useState<number>(0)
  const [ nextPage, setNextPage ] = useState<null | string>(null)
  const [ previousPage, setPreviousPage ] = useState<null | string>(null)
  
  const getList = getCompanyList(pageNumber, 8, nextPage);
  const getUserList = getCompanyUserList();

  useEffect(() => {
    getList.mutate({page: pageNumber+1, page_size: 8, url: nextPage}, {
      onSuccess: (information) => {
        setData(information);
        setTotalData(information.data.count)
        setNextPage(information.data.next)
        setPreviousPage(information.data.previous)
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

  const handlePagination = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    if (newPage < pageNumber) {
      getList.mutate({ page: newPage, page_size: 8, url: nextPage });
    } else {
      getList.mutate({ page: newPage, page_size: 8, url: previousPage });
    }
    setPageNumber(newPage);
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
        count={totalData}
        onPageChange={handlePagination}
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
