"use client";

import { useState } from "react";
import { Button, Modal, Box, TextField, MenuItem } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

interface ModalFormProps {
  buttonText: string;
  formFields: { name: string; label: string; type: string; options?: { label: string; value: string }[] }[];
  onSubmit: (data: any) => Promise<{ success: boolean; error?: string }>; 
}

const ModalForm: React.FC<ModalFormProps> = ({ buttonText, formFields, onSubmit }) => {
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
      <Button variant="contained" color="primary" onClick={handleOpen}>
        {buttonText}
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", p: 4, borderRadius: 2 }}>
          <form onSubmit={handleSubmit(submitForm)}>
      
            {formFields.map((field) => (
              <Controller
                key={field.name}
                name={field.name}
                control={control}
                defaultValue=""
                render={({ field: controllerField }) =>
                  field.type === "select" ? (
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
            {errorMessage && <Box color="error.main">{errorMessage}</Box>}
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button onClick={handleClose} color="secondary" variant="outlined">بستن</Button>
              <Button type="submit" color="primary" variant="contained">ثبت</Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default ModalForm;