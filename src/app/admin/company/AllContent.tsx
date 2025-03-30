"use client";

import React, { useEffect, useState } from "react";
import getCompanyList, { ResponseSchema } from "./hooks/useView";
import useDelete from "./hooks/useDelete";
import useUpdate, { CompanyUpdateSchema } from "./hooks/useUpdate";
import CompanyTable from "./CompanyTable";
import ViewDialog from "@/components/adminPanelComponent/viewProcess/ViewDialog";
import EditDialog from "@/components/adminPanelComponent/viewProcess/EditDialog";
import DeleteDialog from "@/components/adminPanelComponent/viewProcess/DeleteDialog";
import { PrevDataInitial } from "@/interfaces/general/general";
import { columns } from "./ColumnsData";
import useIcons from "@/hooks/reactQueryApiHooks/useIcon";

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
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [ totalData, setTotalData ] = useState<number>(0)
  const [ nextPage, setNextPage ] = useState<null | string>(null)
  
  const getList = getCompanyList(pageNumber, 8, nextPage);
  const { deleteCompanyMutation } = useDelete();
  const { updateCompanyMutation } = useUpdate();
  const iconList = useIcons().icons
  ? useIcons().icons.map((icon) => ({
    id: icon.id,
    value: icon.id, 
    label: icon.url, 
  }))
: [];


  useEffect(() => {
    getList.mutate({page: pageNumber+1, page_size: 8, url: nextPage}, {
      onSuccess: (information) => {
        setData(information);
        setTotalData(information.data.count)
        setNextPage(information.data.next)
      },
    });
  }, [pageNumber]);


  const handleSaveEdit = (updatedRow: CompanyUpdateSchema) => {
    setData((prevData) => {
      if (prevData?.data) {
        updateCompanyMutation.mutate(updatedRow);

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
      deleteCompanyMutation.mutate(selectedRow.id, {
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

  const filteredComumnsForEdit = columns().filter((col) => col.canEdit);

  return (
    <>
      <CompanyTable
        data={data?.data?.results ?? []}
        columns={columns()}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        handleUsersView={handleUsersView}
        selectedCompanyId={selectedCompanyId}
        viewUsersOpen={viewUsersOpen}
        page={pageNumber}
        count={totalData}
        onPageChange={handlePagination}
      />

      <ViewDialog
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        rowData={selectedRow}
        titles={columns()}
      />
      <EditDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={handleSaveEdit}
        rowData={selectedRow}
        titles={filteredComumnsForEdit}
        extraOptions={{ iconList }}
      />
      <DeleteDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        rowData={selectedRow}
        titles={columns()}
      />
    </>
  );
};

export default AllContentCompany;
