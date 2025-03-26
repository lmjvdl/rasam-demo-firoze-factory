'use client';

import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const ViewDialog: React.FC<ViewDialogProps> = ({ 
  open, 
  onClose, 
  rowData, 
  titles,  
  booleanAttributeName, 
  falseLabel, 
  trueLabel, 
  arrayAttributes = {} // پراپ جدید برای آرایه‌ها
}) => {
  if (!rowData) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>مشاهده اطلاعات</DialogTitle>
      <DialogContent>
        {Object.keys(rowData).map((key) => (
          <div key={key}>
            {titles.map((column: any) => {
              if (column.id === key) {
                let valueToShow = rowData[key];

                // اگر نام ویژگی بولی باشد، مقدار آن را به trueLabel یا falseLabel تغییر می‌دهیم
                if (booleanAttributeName && key === booleanAttributeName) {
                  valueToShow = rowData[key] ? trueLabel : falseLabel;
                }

                return (
                  <Typography key={key} variant="body1" gutterBottom>
                    <strong>{column.label}:</strong>{" "}
                    {column.id === "logo" || column.id === "icon" ? (
                      <img 
                        src={valueToShow} 
                        alt={column.label} 
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      />
                    ) : Array.isArray(valueToShow) ? (
                      <div>
                        {valueToShow
                          .map((item: any) => (
                            arrayAttributes[key] ? item[arrayAttributes[key]] : item
                          ))
                          .join(", ")}
                      </div>
                    ) : (
                      valueToShow
                    )}
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