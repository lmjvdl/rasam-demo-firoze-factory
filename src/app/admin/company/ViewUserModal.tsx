"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import getCompanyUserList from "@/app/admin/company/hooks/useUserView";

interface ViewUserModalDialogProps {
  open: boolean;
  onClose: () => void;
  companyId: number | null;
}

const ViewUserModalDialog: React.FC<ViewUserModalDialogProps> = ({ open, onClose, companyId }) => {
  const [selectedUser, setSelectedUser] = useState<number | "">("");
  const [userList, setUserList] = useState<{ id: number; user: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const getUsers = getCompanyUserList();

  // const updateUsers = useMutation({
  //   mutationFn: updateCompanyUsers,
  //   onSuccess: () => {
  //     onClose();
  //   },
  // });

  useEffect(() => {
    if (open && companyId) {
      setLoading(true);
      getUsers.mutate(companyId, {
        onSuccess: (data) => {
          setUserList(data.data.results);
          setLoading(false);
        },
        onError: () => setLoading(false),
      });
    }
  }, [open, companyId]);

  // const handleSave = () => {
  //   if (selectedUser && companyId) {
  //     updateUsers.mutate({ companyId, userId: selectedUser });
  //   }
  // };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>مدیریت کاربران شرکت</DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : (
          <FormControl fullWidth>
            <InputLabel>انتخاب کاربر</InputLabel>
            <Select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value as number)}>
              {userList.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.user}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">بستن</Button>
        {/* <Button onClick={handleSave} color="primary" disabled={loading}>ثبت تغییرات</Button> */}
      </DialogActions>
    </Dialog>
  );
};

export default ViewUserModalDialog;
