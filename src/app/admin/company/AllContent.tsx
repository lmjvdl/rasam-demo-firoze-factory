"use client";

import React, { useEffect, useState } from "react";
import getCompanyList, { ResponseSchema } from "./hooks/useView";
import useDelete from "./hooks/useDelete";
import useUpdate from "./hooks/useUpdate";
import CompanyTable from "./CompanyTable";
import ViewDialog from "@/components/AdminPanelComponent/ViewProcess/ViewDialog";
import EditDialog from "@/components/AdminPanelComponent/ViewProcess/EditDialog";
import DeleteDialog from "@/components/AdminPanelComponent/ViewProcess/DeleteDialog";
import ViewUserModalDialog from "@/app/admin/company/ViewUserModal";
import { PrevDataInitial } from "@/interfaces/general/general";
import { columns } from "./ColumnsData";

const AllContentCompany: React.FC = () => {
  const [data, setData] = useState<ResponseSchema>(PrevDataInitial);
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
  const [ totalData, setTotalData ] = useState<number>(0)
  const [ nextPage, setNextPage ] = useState<null | string>(null)
  
  const getList = getCompanyList(pageNumber, 8, nextPage);
  const { deleteCompanyMutation } = useDelete();
  const { updateCompanyMutation } = useUpdate();
  
  useEffect(() => {
    getList.mutate({page: pageNumber+1, page_size: 8, url: nextPage}, {
      onSuccess: (information) => {
        setData(information);
        setTotalData(information.data.count)
        setNextPage(information.data.next)
      },
    });
  }, [pageNumber]);


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
        prevData || PrevDataInitial
      );
    });
  };

  const handlePagination = (newPage: number) => {
    setPageNumber(newPage);
    getList.mutate({ page: newPage + 1, page_size: 8, url: nextPage });
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
