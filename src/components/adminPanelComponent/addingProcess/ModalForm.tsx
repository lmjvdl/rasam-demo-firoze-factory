"use client";

import { useState, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

const ModalForm: React.FC<ModalFormProps> = ({
  buttonText,
  formFields,
  onSubmit,
  icons,
  loadingIcons,
  fixedValues = {},
}) => {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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

  useEffect(() => {
    if (Object.keys(fixedValues).length > 0) {
      reset(fixedValues);
    }
  }, [fixedValues, reset]);

  return (
    <>
      <Button          
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{
          width: "auto",
          maxWidth: "90vw",
          ml: "17px",
          alignSelf: "flex-start",
          mt: "30px",
        }}
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
                rules={{
                  required: field.required
                    ? `${field.label} اجباری است`
                    : false,
                }}
                render={({ field: controllerField, fieldState, formState }) => {
                  const isFixedField = fixedValues && field.name in fixedValues;

                  if (field.type === "multiselect") {
                    return (
                      <FormControl fullWidth margin="normal">
                        <InputLabel
                          sx={{ "& .MuiInputLabel-asterisk": { color: "red" } }}
                        >
                          {field.label}
                        </InputLabel>
                        <Select
                          multiple
                          value={controllerField.value}
                          onChange={(event) =>
                            controllerField.onChange(event.target.value)
                          }
                          input={<OutlinedInput label={field.label} />}
                          renderValue={(selected) =>
                            (selected as number[])
                              .map(
                                (val) =>
                                  field.options?.find(
                                    (option) => option.value === val
                                  )?.label
                              )
                              .join(", ")
                          }
                        >
                          {field.options?.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              <Checkbox
                                checked={controllerField.value.includes(
                                  option.value
                                )}
                              />
                              <ListItemText primary={option.label} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    );
                  }

                  if (field.type === "select") {
                    return (
                      <FormControl fullWidth margin="normal">
                        <InputLabel required={field.required}>
                          {field.label}
                        </InputLabel>
                        <Select
                          {...controllerField}
                          label={field.label}
                          error={!!errors[field.name]}
                        >
                          {field.options?.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    );
                  }

                  if (field.type === "icon" || field.type === "logo") {
                    return (
                      <FormControl fullWidth margin="normal">
                        <InputLabel>{field.label}</InputLabel>
                        {loadingIcons ? (
                          <CircularProgress size={24} />
                        ) : (
                          <Select
                            {...controllerField}
                            value={controllerField.value || ""}
                            label={field.label}
                            renderValue={(selected) => {
                              const selectedIcon = icons?.find(
                                (icon) => icon.id === selected
                              );
                              return selectedIcon ? (
                                <img
                                  src={selectedIcon.url}
                                  alt="Selected Icon"
                                  style={{ width: 24, height: 24 }}
                                />
                              ) : (
                                ""
                              );
                            }}
                          >
                            {icons?.map((icon) => (
                              <MenuItem key={icon.id} value={icon.id}>
                                <img
                                  src={icon.url}
                                  alt={`Icon ${icon.id}`}
                                  style={{
                                    width: 24,
                                    height: 24,
                                    marginRight: 8,
                                  }}
                                />
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      </FormControl>
                    );
                  }

                  return (
                    <TextField
                      fullWidth
                      margin="normal"
                      label={field.label}
                      type={field.type}
                      required={field.required}
                      error={!!errors[field.name]}
                      helperText={
                        errors[field.name]?.message
                          ? (errors[field.name]?.message as string)
                          : ""
                      }
                      sx={{
                        "& .MuiInputLabel-asterisk": { color: "red" },
                      }}
                      {...controllerField}
                      disabled={isFixedField}
                      InputProps={{
                        readOnly: isFixedField,
                      }}
                    />
                  );
                }}
              />
            ))}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="warning" variant="outlined">
            بستن
          </Button>
          <Button
            onClick={handleSubmit(submitForm)}
            color="primary"
            variant="contained"
          >
            ثبت
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalForm;
