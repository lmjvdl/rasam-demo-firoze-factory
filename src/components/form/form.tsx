"use client";

import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  Checkbox,
  ListItemText,
  CircularProgress,
  Grid,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import OneDayDropdown from "../filtersReportDropDown/OneDay";
import RangeDropdown from "../filtersReportDropDown/Range";

const Form = ({
  formFields,
  onSubmit,
  icons,
  loadingIcons,
  fixedValues = {},
}: ModalFormProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitForm = async (data: any) => {
    const response = await onSubmit(data);
    if (!response.success) {
      setErrorMessage(response.error || "خطایی رخ داده است");
    }
  };

  useEffect(() => {
    if (Object.keys(fixedValues).length > 0) {
      reset(fixedValues);
    }
  }, [fixedValues, reset]);

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <Grid container spacing={2}>
        {formFields.map((field) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={field.name}
          >
            <Controller
              name={field.name}
              control={control}
              defaultValue={field.type === "multiselect" ? [] : ""}
              rules={{
                required: field.required ? `${field.label} اجباری است` : false,
              }}
              render={({ field: controllerField, fieldState, formState }) => {
                const isFixedField = fixedValues && field.name in fixedValues;

                if (field.type === "multiselect") {
                  return (
                    <FormControl fullWidth>
                      <InputLabel
                        sx={{
                          "& .MuiInputLabel-asterisk": { color: "red" },
                        }}
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
                    <FormControl fullWidth>
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

                if (field.type === "oneDateDropdown") {
                  return (
                    <FormControl fullWidth>
                      <OneDayDropdown
                        value={controllerField.value}
                        onChange={controllerField.onChange}
                      />
                    </FormControl>
                  );
                }

                if (field.type === "range") {
                  return (
                    <FormControl fullWidth>
                      <RangeDropdown
                        value={controllerField.value}
                        onChange={controllerField.onChange}
                      />
                    </FormControl>
                  );
                }

                if (field.type === "icon" || field.type === "logo") {
                  return (
                    <FormControl fullWidth>
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
          </Grid>
        ))}

        {errorMessage && (
          <Grid item xs={12}>
            <p style={{ color: "red" }}>{errorMessage}</p>
          </Grid>
        )}

        <Grid item xs={12} sm={6} md={4}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            sx={{ mt: { xs: 0, md: 2 } }}
          >
            ثبت
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
