"use client";

import React, { useEffect, useState } from "react";
import useContactsList, { ResponseSchema } from "./hooks/useView";
import useDelete from "./hooks/useDelete";
import { PrevDataInitial } from "@/interfaces/user/general/general";
import { columns } from "./ColumnsData";
import { ContactsUpdateSchema } from "./hooks/useUpdate";
import ContactsTable from "./ContactsTable";
import useUpdate from "./hooks/useUpdate";
import ViewDialog from "@/components/adminPanelComponent/viewProcess/ViewDialog";
import EditDialog from "@/components/adminPanelComponent/viewProcess/EditDialog";
import DeleteDialog from "@/components/adminPanelComponent/viewProcess/DeleteDialog";
import { useContactsExtraOptions } from "./hooks/useContactsExtraOptions";
import { Contacts } from "@/interfaces/admin/contacts";

const AllContentContacts: React.FC = () => {
  const [data, setData] = useState<ResponseSchema>(PrevDataInitial);
  const [selectedRow, setSelectedRow] = useState<Contacts>();
  const [viewOpen, setViewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);
  const [nextPage, setNextPage] = useState<null | string>(null);

  const { permissionList, groupList } = useContactsExtraOptions();

  const getList = useContactsList(pageNumber, 8, nextPage);
  const { deleteContactsMutation } = useDelete();
  const { updateContactsMutation } = useUpdate();

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

  const handleSaveEdit = (updatedRow: ContactsUpdateSchema) => {
    setData((prevData) => {
      if (prevData?.data) {
        updateContactsMutation.mutate(updatedRow);

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

  const handleView = (row: Contacts) => {
    setSelectedRow(row);
    setViewOpen(true);
  };

  const handleEdit = (row: Contacts) => {
    setSelectedRow(row);
    setEditOpen(true);
  };

  const handleDelete = (row: Contacts) => {
    setSelectedRow(row);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedRow?.id) {
      deleteContactsMutation.mutate(selectedRow.id, {
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
      <ContactsTable
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
          groups: "name",
          user_permissions: "name",
        }}
      />
      <EditDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={handleSaveEdit}
        rowData={selectedRow}
        titles={filteredColumnsForEdit}
        arrayObjectAttributes={["groups", "user_permissions"]}
        extraOptions={{ permissionList, groupList }}
      />
      <DeleteDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        rowData={selectedRow}
        titles={dynamicColumns}
        arrayAttributes={{
          groups: "name",
          user_permissions: "name",
        }}
      />
    </>
  );
};

export default AllContentContacts;