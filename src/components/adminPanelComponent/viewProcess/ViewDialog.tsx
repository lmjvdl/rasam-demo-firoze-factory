import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface ViewDialogProps {
  open: boolean;
  onClose: () => void;
  rowData: any;
  titles: Array<{
    id: string;
    label: string;
    required?: boolean;
    showOnTable?: boolean;
    canEdit?: boolean;
    isAdditionalAction?: boolean;
    isMultiSelect?: boolean;
    isIconSelect?: boolean; 
    optionsKey?: string;
    isSingleSelect?: boolean;
    isActionColumn?: boolean;
  }>;
  booleanAttributeName?: string;
  falseLabel?: string;
  trueLabel?: string;
  arrayAttributes?: Record<string, string>;
  objectAttributes?: string[]; // ویژگی‌های آبجکت که مقدار name آن‌ها باید نمایش داده شود
}

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
    if (objectAttributes.includes(key) && value && typeof value === 'object') {
      return value.name || JSON.stringify(value);
    }
    
    if (booleanAttributeName === key) {
      return value ? trueLabel : falseLabel;
    }
    
    if (Array.isArray(value)) {
      const attributeKey = arrayAttributes[key] || "name";
      return value.map(item => (item && typeof item === 'object' ? item[attributeKey] || 'نامشخص' : item)).join(', ');
    }

    return value;
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>نمایش جزئیات</DialogTitle>
      <DialogContent>
        {titles?.filter(column => column.showOnTable !== false && column.id !== "actions").map(column => (
          <div key={column.id} style={{ marginBottom: 10 }}>
            <strong>{column.label}:</strong> {renderValue(column.id, rowData[column.id]) || 'ندارد'}
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
