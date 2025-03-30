"use client";

import React, { useEffect, useState } from "react";
import getUserCompanyList, { ResponseSchema } from "./hooks/useView";
import useDelete from "./hooks/useDelete";
import ViewDialog from "@/components/adminPanelComponent/viewProcess/ViewDialog";
import EditDialog from "@/components/adminPanelComponent/viewProcess/EditDialog";
import DeleteDialog from "@/components/adminPanelComponent/viewProcess/DeleteDialog";
import { PrevDataInitial } from "@/interfaces/general/general";
import { columns } from "./ColumnsData";
import { UserCompanyUpdateSchema } from "./hooks/useUpdate";
import UserCompanyTable from "./UserCompanyTable";
import useUpdate from "./hooks/useUpdate";
import { UserCompanyPageProps } from "@/interfaces/admin/userCompany";
import usePermissionQuery from "./hooks/usePermissionList";


export default function AllContentUserCompany({ companyId }: UserCompanyPageProps) {
  const [data, setData] = useState<ResponseSchema>(PrevDataInitial);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);
  const [nextPage, setNextPage] = useState<null | string>(null);
  const getList = getUserCompanyList(companyId);
  const { deleteUserCompanyMutation } = useDelete();
  const { updateUserCompanyMutation } = useUpdate();
  const permissionList = usePermissionQuery().data
  ? usePermissionQuery().data.map((permission) => ({
      id: permission.id,
      value: permission.id, 
      label: permission.translate, 
    }))
  : [];
  const groupList = usePermissionQuery().data
  ? usePermissionQuery().data.map((permission) => ({
      id: permission.id,
      value: permission.id, 
      label: permission.translate, 
    }))
  : [];


  useEffect(() => {
    getList.mutate(
      { company_id: companyId },
      {
        onSuccess: (information) => {
          setData(information);
          setTotalData(information.data.count);
          setNextPage(information.data.next);
        },
      }
    );
  }, [pageNumber]);

  const handleSaveEdit = (updatedRow: UserCompanyUpdateSchema) => {
    setData((prevData) => {
      if (prevData?.data) {
        updateUserCompanyMutation.mutate(updatedRow);

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
      deleteUserCompanyMutation.mutate(selectedRow.id, {
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

  const dynamicColumns = columns();
  const filteredColumnsForEdit = dynamicColumns.filter((col) => col.canEdit);

  return (
    <>
      <UserCompanyTable
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
        arrayAttributes={{
          permissions: 'name', 
        }}
        
      />
      <EditDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={handleSaveEdit}
        rowData={selectedRow}
        titles={filteredColumnsForEdit}
        extraOptions={{ permissionList, groupList }}
        arrayObjectAttributes={['permissions', "groups"]}
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

