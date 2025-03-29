'use client';

import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const DeleteDialog: React.FC<DeleteDialogProps> = ({ 
  open, 
  onClose, 
  onConfirm, 
  rowData, 
  titles,
  arrayAttributes = {}
}) => {
  if (!rowData) return null;

  const renderArrayValue = (array: any[], attributeKey: string) => {
    if (!array || array.length === 0) return 'هیچ موردی وجود ندارد';
    
    return array
      .map(item => {
        if (attributeKey && typeof item === 'object' && item !== null) {
          return item[attributeKey] || 'نامشخص';
        }
        if (typeof item === 'object' && item !== null && 'name' in item) {
          return item.name;
        }
        if (typeof item === 'object' && item !== null && 'id' in item) {
          return `#${item.id}`;
        }
        return item;
      })
      .join(', ');
  };

  const renderRowData = () => {
    return titles?.filter((column: any) => column.showOnTable !== false).map((column: any) => {
      const key = column.id;
      if (!key || !rowData.hasOwnProperty(key)) return null;

      let value = rowData[key];

      if (typeof value === 'boolean') {
        value = value ? 'فعال' : 'غیرفعال';
      }
      else if (Array.isArray(value)) {
        value = renderArrayValue(value, arrayAttributes[key]);
      }

      return (
        <Typography 
          key={key} 
          variant="body2" 
          color="text.primary" 
          gutterBottom
          sx={{ display: 'flex' }}
        >
          <strong style={{ minWidth: '120px', display: 'inline-block' }}>
            {column.label}:
          </strong>
          <span>{value || '--'}</span>
        </Typography>
      );
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: 'center' }}>حذف اطلاعات</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1" gutterBottom>
          آیا مطمئن هستید که می‌خواهید این مورد را حذف کنید؟
        </Typography>
        {renderRowData()}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit" variant="outlined">لغو</Button>
        <Button onClick={onConfirm} color="error" variant="contained">حذف</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
