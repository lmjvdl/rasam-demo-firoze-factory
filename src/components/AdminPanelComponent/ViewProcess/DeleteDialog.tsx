'use client';

import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const DeleteDialog: React.FC<DeleteDialogProps> = ({ open, onClose, onConfirm, rowData, titles }) => {
  if (!rowData) return null;

  const renderRowData = () => {
    return Object.keys(rowData).map((key) => (
      titles.map((column: any) => {
        if (column.id === key) {
          // Check if the value is a boolean and convert it to 'فعال' or 'غیرفعال'
          const value = typeof rowData[key] === 'boolean' ? (rowData[key] ? 'فعال' : 'غیرفعال') : rowData[key];

          return (
            <Typography key={key} variant="body2" color="textSecondary" gutterBottom>
              {`${column.label}: ${value}`}
            </Typography>
          );
        }
        return null;
      })
    ));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>حذف اطلاعات</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          آیا مطمئن هستید که می‌خواهید این مورد را حذف کنید؟
        </Typography>
        {renderRowData()}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit" variant="outlined">لغو</Button>
        <Button onClick={onConfirm} color="error">حذف</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
