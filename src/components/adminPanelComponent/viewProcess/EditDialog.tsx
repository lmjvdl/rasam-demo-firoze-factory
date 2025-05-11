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

const EditDialog: React.FC<EditDialogProps> = ({
  open,
  onClose,
  onSave,
  rowData = {},
  titles = [],
  booleanAttributeName = "is_active",
  trueLabel = "True",
  falseLabel = "False",
  booleanValue,
  onBooleanValueChange,
  extraOptions = {},
}) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>(
    rowData || {}
  );
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  const getObjectId = (value: any) => {
    if (value && typeof value === "object" && value.id !== undefined) {
      return value.id;
    }
    return value;
  };

  const getArrayObjectIds = (value: any) => {
    if (Array.isArray(value)) {
      return value.map((item) => item?.id || item);
    }
    return value || [];
  };

  useEffect(() => {
    setFormData(rowData || {});
  }, [rowData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const newValue = event.target.value === "true";
    setFormData((prev) => ({
      ...prev,
      [booleanAttributeName]: newValue,
    }));
    onBooleanValueChange?.(newValue);
  };

  const handleMultiSelectChange = (
    event: SelectChangeEvent<string[]>,
    key: string
  ) => {
    const selectedIds = event.target.value;
    const allOptions = extraOptions?.[titles.find(t => t.id === key)?.optionsKey || ''] || [];
    
    setFormData((prev) => ({
      ...prev,
      [key]: allOptions
        .filter(opt => selectedIds.includes(String(opt.id)))
        .map(opt => ({ id: opt.id, name: opt.label })),
    }));
  };

  const handleSingleSelectChange = (
    event: SelectChangeEvent<string>,
    key: string
  ) => {
    const selectedId = event.target.value;
    const allOptions = extraOptions?.[titles.find(t => t.id === key)?.optionsKey || ''] || [];
    const selectedOption = allOptions.find(opt => opt.id == selectedId);
    
    setFormData((prev) => ({
      ...prev,
      [key]: selectedOption 
        ? { id: selectedOption.id, name: selectedOption.label } 
        : null,
    }));
  };

  const handleSave = () => {
    const newErrors: { [key: string]: boolean } = {};
    titles.forEach((column) => {
      if (
        column.required &&
        column.id &&
        (formData[column.id] === undefined ||
          formData[column.id] === null ||
          formData[column.id] === "")
      ) {
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

          if (key === booleanAttributeName) {
            return (
              <FormControl key={booleanAttributeName} fullWidth margin="dense">
                <InputLabel>{column.label}</InputLabel>
                <Select
                  value={booleanValue ? "true" : "false"}
                  onChange={(e) => handleSelectChange(e)}
                  input={<OutlinedInput label={column.label} />}
                >
                  <MenuItem value="true">{trueLabel}</MenuItem>
                  <MenuItem value="false">{falseLabel}</MenuItem>
                </Select>
              </FormControl>
            );
          }


          if (column.isIconSelect && column.optionsKey) {
            const allIcons = extraOptions[column.optionsKey] || [];
            const selectedIcon = formData?.[key] || "";
          
            return (
              <FormControl key={key} fullWidth margin="dense">
                <InputLabel>{column.label}</InputLabel>
                <Select
                  value={selectedIcon}
                  onChange={(e) => setFormData((prev) => ({ ...prev, [key]: Number(e.target.value) }))}
                  input={<OutlinedInput label={column.label} />}
                  renderValue={(selected) => {
                    const selectedItem = allIcons.find((icon) => icon.id === selected);
                    return (
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        {selectedItem && <img src={selectedItem.label} alt="icon" style={{ width: "24px", height: "24px" }} />}
  
                      </div>
                    );
                  }}
                >
                  {allIcons.map((icon) => (
                    <MenuItem key={icon.id} value={icon.id}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <img src={icon.label} alt="icon" style={{ width: "24px", height: "24px" }} />
                      </div>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            );
          }

          if (column.isSingleSelect && column.optionsKey) {
            const allOptions = extraOptions[column.optionsKey] || [];
            const currentValue = formData?.[key];
            const selectedId = getObjectId(currentValue);
            
            return (
              <FormControl key={key} fullWidth margin="dense" required={column.required}>
                <InputLabel>{column.label}</InputLabel>
                <Select
                  value={selectedId ? String(selectedId) : ''}
                  onChange={(e) => handleSingleSelectChange(e, key)}
                  input={<OutlinedInput label={column.label} />}
                >
                  {allOptions.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors[key] && (
                  <span style={{ color: "red", fontSize: "0.75rem" }}>
                    این فیلد اجباری است.
                  </span>
                )}
              </FormControl>
            );
          }
          
          if (column.isMultiSelect && column.optionsKey) {
            const allOptions = extraOptions[column.optionsKey] || [];
            const currentValue = formData?.[key];
            const selectedIds = getArrayObjectIds(currentValue).map(String);
            
            return (
              <FormControl key={key} fullWidth margin="dense" required={column.required}>
                <InputLabel>{column.label}</InputLabel>
                <Select
                  multiple
                  value={selectedIds}
                  onChange={(e) => handleMultiSelectChange(e, key)}
                  input={<OutlinedInput label={column.label} />}
                  renderValue={(selected) =>
                    selected
                      .map(
                        (val: any) =>
                          allOptions.find((opt) => opt.id == val)?.label || val
                      )
                      .join(", ")
                  }
                >
                  {allOptions.map((option) => (
                    <MenuItem key={option.id} value={String(option.id)}>
                      <Checkbox checked={selectedIds.includes(String(option.id))} />
                      <ListItemText primary={option.label} />
                    </MenuItem>
                  ))}
                </Select>
                {errors[key] && (
                  <span style={{ color: "red", fontSize: "0.75rem" }}>
                    این فیلد اجباری است.
                  </span>
                )}
              </FormControl>
            );
          }

          return (
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
              onChange={handleInputChange}
              fullWidth
              error={!!errors[key]}
              helperText={errors[key] ? "این فیلد اجباری است." : ""}
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
