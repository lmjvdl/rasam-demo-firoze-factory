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
import { transformArrayAttributes } from "@/utils/formatters/extractId";


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
  arrayAttributes = [],
}) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>(rowData || {});
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});


  useEffect(() => {
    if (rowData) {
      const transformedData = transformArrayAttributes(
        {
          ...rowData,
          function: typeof rowData.function === "object" ? rowData.function.id : rowData.function,
          device: typeof rowData.device === "object" ? rowData.device.id : rowData.device,
          type: typeof rowData.type === "object" ? rowData.type.id : rowData.type,
        },
        arrayAttributes
      );
      
      setFormData(transformedData);
    }
  }, [rowData, arrayAttributes]);

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

  const handleMultiSelectChange = (event: SelectChangeEvent<string[]>, key: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: event.target.value,
    }));
  };

  const handleSingleSelectChange = (event: SelectChangeEvent<string>, key: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: Number(event.target.value),
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
          formData[column.id] === "" ||
          (Array.isArray(formData[column.id]) && formData[column.id].length === 0))
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

          if (column.isSingleSelect && column.optionsKey) {
            const allOptions = extraOptions[column.optionsKey] || [];
            return (
              <FormControl
                key={key}
                fullWidth
                margin="dense"
                required={column.required}
              >
                <InputLabel>{column.label}</InputLabel>
                <Select
                  value={typeof value === "object" ? value.id : value}
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
            const selectedValues = formData?.[key] || [];
            return (
              <FormControl
                key={key}
                fullWidth
                margin="dense"
                required={column.required}
              >
                <InputLabel>{column.label}</InputLabel>
                <Select
                  multiple
                  value={selectedValues}
                  onChange={(e) => handleMultiSelectChange(e, key)}
                  input={<OutlinedInput label={column.label} />}
                  renderValue={(selected) =>
                    selected
                      .map(
                        (val: any) =>
                          allOptions.find((opt) => opt.id === val)?.label || val
                      )
                      .join(", ")
                  }
                >
                  {allOptions.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {selectedValues.includes(option.id) && (
                        <Checkbox checked />
                      )}
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
