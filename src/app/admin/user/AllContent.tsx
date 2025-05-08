"use client";

import React, { useEffect, useState } from "react";
import getUserList, { ResponseSchema } from "./hooks/useView";
import useDelete from "./hooks/useDelete";
import ViewDialog from "@/components/adminPanelComponent/viewProcess/ViewDialog";
import EditDialog from "@/components/adminPanelComponent/viewProcess/EditDialog";
import DeleteDialog from "@/components/adminPanelComponent/viewProcess/DeleteDialog";
import { PrevDataInitial } from "@/interfaces/general/general";
import { columns } from "./ColumnsData";
import { UserUpdateSchema, useUpdate } from "./hooks/useUpdate";
import UserTable from "./UserTable";
import useDataQuery from "@/hooks/adminDataQuery/useDataQuery";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import productLineUrls from "@/utils/url/adminPanel/productLineUrl";
import groupUrls from "@/utils/url/adminPanel/groupUrl";

const AllContentUser: React.FC = () => {
  const [data, setData] = useState<ResponseSchema>(PrevDataInitial);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);
  const [nextPage, setNextPage] = useState<null | string>(null);

  const getList = getUserList(pageNumber, 8, nextPage);
  const { deleteUserMutation } = useDelete();
  const { updateUserMutation } = useUpdate();
  const dynamicColumns = columns();
  const filteredColumnsForEdit = dynamicColumns.filter((col) => col.canEdit);

  const productLineList = useDataQuery(
    allQueryKeys.adminPanel.productLine.list,
    productLineUrls.listProductLine
  ).data
    ? useDataQuery(
        allQueryKeys.adminPanel.productLine.list,
        productLineUrls.listProductLine
      ).data.map((product_line) => ({
        id: product_line.id,
        value: product_line.id,
        label: product_line.name,
      }))
    : [];

  const groupList = useDataQuery(
    allQueryKeys.adminPanel.group.list,
    groupUrls.listGroup
  ).data
    ? useDataQuery(
        allQueryKeys.adminPanel.group.list,
        groupUrls.listGroup
      ).data.map((group) => ({
        id: group.id,
        value: group.id,
        label: group.name,
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

  const handleSaveEdit = (updatedRow: UserUpdateSchema) => {
    setData((prevData) => {
      if (prevData?.data) {
        updateUserMutation.mutate(updatedRow);

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
      deleteUserMutation.mutate(selectedRow.id, {
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

  // Handling the boolean value change (is_active)
  const handleBooleanValueChange = (value: boolean) => {
    setSelectedRow((prevSelectedRow: UserUpdateSchema | null) => {
      if (prevSelectedRow) {
        return {
          ...prevSelectedRow,
          is_active: value,
        };
      }
      return prevSelectedRow;
    });
  };

  return (
    <>
      <UserTable
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
        booleanAttributeName="is_active"
        falseLabel="غیر فعال"
        trueLabel="فعال"
        arrayAttributes={{
          product_line: "name",
          groups: "name",
        }}
      />
      <EditDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={handleSaveEdit}
        rowData={selectedRow}
        titles={filteredColumnsForEdit}
        booleanAttributeName="is_active"
        booleanValue={selectedRow?.is_active}
        falseLabel="غیر فعال"
        trueLabel="فعال"
        extraOptions={{ productLineList, groupList }}
        onBooleanValueChange={handleBooleanValueChange}
        arrayObjectAttributes={["productLineList", "groupList"]}
      />

      <DeleteDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        rowData={selectedRow}
        titles={dynamicColumns}
        arrayAttributes={{
          product_line: "name",
          groups: "name",
        }}
      />
    </>
  );
};

export default AllContentUser;
