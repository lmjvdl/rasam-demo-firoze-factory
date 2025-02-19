"use client";

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

interface ModalFormProps {
  buttonText: string;
  formFields: {
    name: string;
    label: string;
    type: string;
    options?: { label: string; value: string }[];
  }[];
  sxButton?: object;
  onSubmit: (data: any) => Promise<{ success: boolean; error?: string }>;
}

const ModalForm: React.FC<ModalFormProps> = ({
  buttonText,
  formFields,
  onSubmit,
}) => {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { control, handleSubmit, reset } = useForm();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset();
    setErrorMessage("");
  };

  const submitForm = async (data: any) => {
    const response = await onSubmit(data);
    if (response.success) {
      handleClose();
    } else {
      setErrorMessage(response.error || "خطایی رخ داده است");
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{ width: "auto", maxWidth: "90vw", alignSelf: "flex-start", mr: "auto", mt: "30px" }}
      >
        {buttonText}
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{buttonText}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(submitForm)}>
            {formFields.map((field) => (
              <Controller
                key={field.name}
                name={field.name}
                control={control}
                defaultValue={field.type === "multiselect" ? [] : ""}
                render={({ field: controllerField }) =>
                  field.type === "multiselect" ? (
                    <FormControl fullWidth margin="normal">
                      <InputLabel>{field.label}</InputLabel>
                      <Select
                        multiple
                        value={controllerField.value}
                        onChange={(event) => controllerField.onChange(event.target.value)}
                        input={<OutlinedInput label={field.label} />}
                        renderValue={(selected) =>
                          (selected as string[]).map(
                            (val) =>
                              field.options?.find((option) => option.value === val)?.label
                          ).join(", ")
                        }
                      >
                        {field.options?.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            <Checkbox checked={controllerField.value.includes(option.value)} />
                            <ListItemText primary={option.label} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : field.type === "select" ? (
                    <TextField select fullWidth margin="normal" label={field.label} {...controllerField}>
                      {field.options?.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  ) : (
                    <TextField fullWidth margin="normal" label={field.label} type={field.type} {...controllerField} />
                  )
                }
              />
            ))}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="warning" variant="outlined">
            بستن
          </Button>
          <Button onClick={handleSubmit(submitForm)} color="primary" variant="contained">
            ثبت
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalForm;
