"use client";

import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

interface ViewUserModalDialogProps {
  open: boolean;
  onClose: () => void;
  userList: { id: number; user: number }[];
}

const ViewUserModalDialog: React.FC<ViewUserModalDialogProps> = ({ open, onClose, userList }) => {
  const [selectedUser, setSelectedUser] = useState<number | "">("");

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>لیست کاربران شرکت</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel>انتخاب کاربر</InputLabel>
          <Select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value as number)}
          >
            {userList.map((user) => (
              <MenuItem key={user.id} value={user.user}>
                {user.user}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">بستن</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewUserModalDialog;