'use client';

import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const ViewDialog: React.FC<ViewDialogProps> = ({ 
  open, 
  onClose, 
  rowData, 
  titles,  
  booleanAttributeName, 
  falseLabel = 'خیر',
  trueLabel = 'بله', 
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

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ textAlign: 'center' }}>مشاهده اطلاعات</DialogTitle>
      <DialogContent dividers>
        {titles?.filter((column: any) => column.showOnTable !== false).map((column: any) => {
          const key = column.id;
          if (!key || !rowData.hasOwnProperty(key)) return null;

          let valueToShow = rowData[key];

          // نمایش مقدار boolean
          if (booleanAttributeName && key === booleanAttributeName) {
            valueToShow = valueToShow ? trueLabel : falseLabel;
          }

          return (
            <Typography 
              key={key} 
              variant="body1" 
              gutterBottom
              sx={{ display: 'flex', alignItems: 'flex-start' }}
            >
              <strong style={{ minWidth: '150px', display: 'inline-block' }}>
                {column.label}:
              </strong>
              <span style={{ flex: 1 }}>
                {column.isImage ? (
                  <img 
                    src={valueToShow} 
                    alt={column.label} 
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                ) : Array.isArray(valueToShow) ? (
                  renderArrayValue(valueToShow, arrayAttributes[key])
                ) : (
                  valueToShow || '--'
                )}
              </span>
            </Typography>
          );
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="warning" variant="outlined">
          بستن
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ViewDialog;