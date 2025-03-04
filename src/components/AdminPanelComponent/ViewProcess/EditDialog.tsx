import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  Checkbox,
  ListItemText,
  SelectChangeEvent,
} from "@mui/material";

interface EditDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  rowData?: { [key: string]: any };
  titles: { id: string; label: string; required?: boolean }[];
}

const EditDialog: React.FC<EditDialogProps> = ({
  open,
  onClose,
  onSave,
  rowData = {},
  titles = [],
}) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>(
    rowData || {}
  );
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const permissionsList = ["Admin", "Editor", "Viewer", "User", "SuperAdmin"];

  useEffect(() => {
    setFormData(rowData || {});
  }, [rowData]);

  // برای تغییرات در Select
  const handleSelectChange = (event: SelectChangeEvent<boolean>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value === "true",
    }));
  };

  // برای تغییرات در TextField
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleMultiSelectChange = (name: string) => (event: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: event.target.value,
    }));
  };

  const handleSave = () => {
    const newErrors: { [key: string]: boolean } = {};
    titles.forEach((column) => {
      if (column.required && column.id && !formData[column.id]) {
        newErrors[column.id] = true;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>ویرایش اطلاعات</DialogTitle>
      <DialogContent>
        {titles.map((column) => {
          const key = column.id;
          if (!key) return null;
          const value = formData?.[key] || "";

          if (key === "is_active") {
            return (
              <FormControl key={key} fullWidth margin="dense">
                <InputLabel>{column.label}</InputLabel>
                <Select
                  value={value !== undefined ? value.toString() : ""}
                  onChange={handleSelectChange} // استفاده از handleSelectChange
                  input={<OutlinedInput label={column.label} />}
                >
                  <MenuItem value="true">فعال</MenuItem>
                  <MenuItem value="false">غیرفعال</MenuItem>
                </Select>
              </FormControl>
            );
          }

          return Array.isArray(value) ? (
            <FormControl key={key} fullWidth margin="dense">
              <InputLabel>{column.label}</InputLabel>
              <Select
                multiple
                value={value}
                onChange={handleMultiSelectChange(key)}
                input={<OutlinedInput label={column.label} />}
                renderValue={(selected) => selected.join(", ")}
              >
                {permissionsList.map((option) => (
                  <MenuItem key={option} value={option}>
                    <Checkbox checked={value.includes(option)} />
                    <ListItemText primary={option} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <TextField
              key={key}
              margin="dense"
              label={
                column.required ? (
                  <>
                    {column.label} <span style={{ color: "red" }}>*</span>
                  </>
                ) : (
                  column.label
                )
              }
              name={key}
              value={value}
              onChange={handleInputChange} // استفاده از handleInputChange
              fullWidth
              error={!!errors[key]}
              helperText={errors[key] ? "این فیلد الزامی است" : ""}
            />
          );
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="warning" variant="outlined">
          لغو
        </Button>
        <Button onClick={handleSave} color="primary">
          ذخیره
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
