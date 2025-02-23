"use client";

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
} from "@mui/material";


const EditDialog: React.FC<EditDialogProps> = ({
  open,
  onClose,
  onSave,
  rowData,
  titles,
}) => {
  if (!rowData) return null;
  const [formData, setFormData] = useState(rowData);
  // const [permissionsList, setPermissionsList] = useState<string[]>([]); // لیست کل دسترسی‌ها

  // useEffect(() => {
  //   fetch("/api/permissions")
  //     .then((response) => response.json())
  //     .then((data) => setPermissionsList(data))
  //     .catch((error) => console.error("خطا در دریافت دسترسی‌ها:", error));
  // }, []);

  const permissionsList = ["Admin", "Editor", "Viewer", "User", "SuperAdmin"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMultiSelectChange = (name: string) => (event: any) => {
    setFormData({ ...formData, [name]: event.target.value });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>ویرایش اطلاعات</DialogTitle>
      <DialogContent>
        {Object.keys(rowData).map((key) => (
          <div key={key}>
            {titles.map((column: any) => {
              if (column.id === key) {
                return Array.isArray(formData[key]) ? (
                  <FormControl key={key} fullWidth margin="dense">
                    <InputLabel>{column.label}</InputLabel>
                    <Select
                      multiple
                      value={formData[key]}
                      onChange={handleMultiSelectChange(key)}
                      input={<OutlinedInput label={column.label} />}
                      renderValue={(selected) => selected.join(", ")}
                    >
                      {permissionsList.map((option) => (
                        <MenuItem key={option} value={option}>
                          <Checkbox checked={formData[key].includes(option)} />
                          <ListItemText primary={option} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <TextField
                    key={key}
                    margin="dense"
                    label={column.label}
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    fullWidth
                  />
                );
              }
              return null;
            })}
          </div>
        ))}
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
