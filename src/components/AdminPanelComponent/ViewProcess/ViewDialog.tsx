'use client';

import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';


const ViewDialog: React.FC<ViewDialogProps> = ({ open, onClose, rowData, titles }) => {
  if (!rowData) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>مشاهده اطلاعات</DialogTitle>
      <DialogContent>
        {Object.keys(rowData).map((key) => (
          <div key={key}>
            {titles.map((column: any) => {
              if (column.id === key) {
                return (
                  <Typography key={key} variant="body1" gutterBottom>
                    <strong>{column.label}:</strong>{" "}
                    {Array.isArray(rowData[key]) ? rowData[key].join(", ") : rowData[key]}
                  </Typography>
                );
              }
              return null;
            })}
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="warning" variant="outlined">بستن</Button>
      </DialogActions>
    </Dialog>
  );
};


export default ViewDialog;
