'use client';

import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';


const ViewUserModalDialog: React.FC<ViewUserDetailModal> = ({ open, onClose, rowData, titles, onConfirm }) => {
  console.log(rowData)
  console.log(titles)
  if (!rowData) return null;
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>مشاهده اطلاعات کاربران</DialogTitle>
      <DialogContent>

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="warning" variant="outlined">بستن</Button>
        <Button onClick={onConfirm} color="error">حذف</Button>
      </DialogActions>
    </Dialog>
  );
};


export default ViewUserModalDialog;
