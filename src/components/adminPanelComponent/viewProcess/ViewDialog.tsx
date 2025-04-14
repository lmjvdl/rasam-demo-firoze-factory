import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const ViewDialog: React.FC<ViewDialogProps> = ({ 
  open, 
  onClose, 
  rowData, 
  titles, 
  booleanAttributeName, 
  falseLabel = "خیر", 
  trueLabel = "بله", 
  arrayAttributes = {},
  objectAttributes = []
}) => {
  if (!rowData || typeof rowData !== 'object') return null;

  const renderValue = (key: string, value: any) => {
    // Handle object attributes (e.g., function_info, device_info, type_info)
    if (objectAttributes.includes(key) && value && typeof value === 'object') {
      return value.name || value.id || 'نامشخص';
    }
    
    // Handle boolean values
    if (booleanAttributeName === key) {
      return value ? trueLabel : falseLabel;
    }
    
    // Handle arrays (if any)
    if (Array.isArray(value)) {
      const attributeKey = arrayAttributes[key] || "name";
      return value.map(item => {
        if (item && typeof item === 'object') {
          return item[attributeKey] || 'نامشخص';
        }
        return item;
      }).join(', ');
    }

    // Handle strings, numbers, etc.
    return value !== null && value !== undefined ? String(value) : 'ندارد';
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>نمایش جزئیات</DialogTitle>
      <DialogContent>
        {titles?.filter(column => !column.isActionColumn).map(column => (
          <div key={column.id} style={{ marginBottom: 10 }}>
            <strong>{column.label}:</strong> {renderValue(column.id, rowData[column.id])}
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">بستن</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewDialog;