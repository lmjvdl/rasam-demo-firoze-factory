"use client";

import DataTable from "@/components/AdminPanelComponent/ViewProcess/DataTable";
import DeleteDialog from "@/components/AdminPanelComponent/ViewProcess/DeleteDialog";
import EditDialog from "@/components/AdminPanelComponent/ViewProcess/EditDialog";
import ViewDialog from "@/components/AdminPanelComponent/ViewProcess/ViewDialog";
import ViewUserModalDialog from "@/components/AdminPanelComponent/ViewProcess/ViewUserModal";
import React, { useState } from "react";

const columns = [
  { id: "username", label: "نام کاربری", showOnTable: true },
  { id: "first_name", label: "نام", showOnTable: true },
  { id: "last_name", label: "نام خانوادگی", showOnTable: true },
  { id: "password", label: "رمز عبور", showOnTable: false },
  { id: "phone_number", label: "شماره تلفن", showOnTable: false },
  { id: "email", label: "ایمیل", showOnTable: false },
  { id: "permission", label: "دسترسی", showOnTable: false },
  { id: "actions", label: "عملیات", isActionColumn: true },
];

const initialData = [
  {
    username: "ALI",
    first_name: "علی",
    last_name: "جعفری",
    password: "1234",
    phone_number: "09137328210",
    email: "lmjvdl82@gmail.com",
    permission: ["Admin", "Editor"],
  },
  {
    username: "Hossein",
    first_name: "علی",
    last_name: "جعفری",
    password: "1234",
    phone_number: "09137328210",
    email: "lmjvdl82@gmail.com",
    permission: ["User"],
  },
  {
    username: "Jafar",
    first_name: "علی",
    last_name: "جعفری",
    password: "1234",
    phone_number: "09137328210",
    email: "lmjvdl82@gmail.com",
    permission: ["Admin", "Editor"],
  },
  {
    username: "Mohsen",
    first_name: "علی",
    last_name: "جعفری",
    password: "1234",
    phone_number: "09137328210",
    email: "lmjvdl82@gmail.com",
    permission: ["Admin", "Editor"],
  },
];

const UserView: React.FC = () => {
  const [data, setData] = useState(initialData);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

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
  };

  const handleDelete = (row: any) => {
    setSelectedRow(row);
    setDeleteOpen(true);
  };

  const handleSaveEdit = (updatedRow: any) => {
    setData(
      data.map((row) =>
        row.username === updatedRow.username ? updatedRow : row
      )
    );
  };

  const handleConfirmDelete = () => {
    setData(data.filter((row) => row.username !== selectedRow.username));
    setDeleteOpen(false);
  };

  return (
    <div>
      <DataTable
        columns={filteredColumns}
        data={data}
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
    </div>
  );
};

export default UserView;
