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
  arrayAttributes = {}
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

                if (booleanAttributeName && key === booleanAttributeName) {
                  valueToShow = rowData[key] ? trueLabel : falseLabel;
                }

                return (
                  <div key={key}>
                    <Typography variant="body1" gutterBottom component="div">
                      <strong>{column.label}:</strong>{" "}
                      {column.id === "logo" || column.id === "icon" ? (
                        <img 
                          src={valueToShow} 
                          alt={column.label} 
                          style={{ maxWidth: "100px", maxHeight: "100px" }}
                        />
                      ) : Array.isArray(valueToShow) ? (
                        <span>
                          {valueToShow
                            .map((item: any) => (
                              arrayAttributes[key] ? item[arrayAttributes[key]] : item
                            ))
                            .join(", ")}
                        </span>
                      ) : (
                        valueToShow
                      )}
                    </Typography>
                  </div>
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