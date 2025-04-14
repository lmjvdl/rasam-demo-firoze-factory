'use client';

import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const DeleteDialog: React.FC<DeleteDialogProps> = ({ 
  open, 
  onClose, 
  onConfirm, 
  rowData, 
  titles,
  arrayAttributes = {},
  objectAttributes = []
}) => {
  if (!rowData) return null;

  const renderObjectValue = (obj: any) => {
    if (!obj) return '--';
    if (typeof obj === 'string' || typeof obj === 'number') return obj;
    if (obj.name) return obj.name;
    if (obj.id) return `#${obj.id}`;
    if (obj.label) return obj.label;
    if (obj.value) return obj.value;
    return JSON.stringify(obj);
  };

  const renderArrayValue = (array: any[], attributeKey: string) => {
    if (!array || array.length === 0) return 'هیچ موردی وجود ندارد';
    
    return array
      .map(item => renderObjectValue(item))
      .join(', ');
  };

  const renderValue = (key: string, value: any) => {
    if (value === null || value === undefined) return '--';
    if (typeof value === 'boolean') return value ? 'فعال' : 'غیرفعال';
    if (Array.isArray(value)) return renderArrayValue(value, arrayAttributes[key]);
    if (typeof value === 'object') return renderObjectValue(value);
    return value;
  };

  const renderRowData = () => {
    return titles?.filter((column: any) => column.showOnTable !== false && !column.isActionColumn).map((column: any) => {
      const key = column.id;
      if (!key || !rowData.hasOwnProperty(key)) return null;

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
          <span>{renderValue(key, rowData[key])}</span>
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