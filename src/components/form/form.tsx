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
  FormHelperText,
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
  buttonText = "ثبت",
}: ModalFormProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const submitForm = async (data: any) => {
    try {
      const response = await onSubmit(data);
      if (!response.success) {
        setErrorMessage(response.error || "خطایی رخ داده است");
      }
    } catch (error) {
      setErrorMessage("خطایی در ارسال فرم رخ داده است");
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
          <Grid item xs={12} sm={6} md={3} key={field.name}>
            <Controller
              name={field.name}
              control={control}
              defaultValue={
                field.type === "multiselect"
                  ? []
                  : fixedValues[field.name] || ""
              }
              rules={{
                required: field.required
                  ? `${field.label} اجباری است`
                  : false,
                validate: (value) => {
                  if (field.required) {
                    if (field.type === "multiselect") {
                      return value.length > 0 || `${field.label} اجباری است`;
                    }
                    return !!value || `${field.label} اجباری است`;
                  }
                  return true;
                },
              }}
              render={({ field: controllerField, fieldState }) => {
                const isFixedField = fixedValues && field.name in fixedValues;
                const error = fieldState.error;

                if (field.type === "multiselect") {
                  return (
                    <FormControl fullWidth error={!!error}>
                      <InputLabel
                        sx={{
                          "& .MuiInputLabel-asterisk": { color: "red" },
                        }}
                      >
                        {field.label}
                        {field.required && " *"}
                      </InputLabel>
                      <Select
                        multiple
                        value={controllerField.value || []}
                        onChange={controllerField.onChange}
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
                        disabled={isFixedField}
                      >
                        {field.options?.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            <Checkbox
                              checked={
                                controllerField.value
                                  ? controllerField.value.includes(option.value)
                                  : false
                              }
                            />
                            <ListItemText primary={option.label} />
                          </MenuItem>
                        ))}
                      </Select>
                      {error && (
                        <FormHelperText error>{error.message}</FormHelperText>
                      )}
                    </FormControl>
                  );
                }

                if (field.type === "select") {
                  return (
                    <FormControl fullWidth error={!!error}>
                      <InputLabel>
                        {field.label}
                        {field.required && " *"}
                      </InputLabel>
                      <Select
                        {...controllerField}
                        label={field.label}
                        disabled={isFixedField}
                      >
                        {field.options?.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {error && (
                        <FormHelperText error>{error.message}</FormHelperText>
                      )}
                    </FormControl>
                  );
                }

                if (field.type === "oneDateDropdown") {
                  return (
                    <FormControl fullWidth error={!!error}>
                      <OneDayDropdown
                        value={controllerField.value}
                        onChange={controllerField.onChange}
                        disabled={isFixedField}
                        placeholder={`${field.placeholder} ${field.required ? "*" : ""}`}
                      />
                      {error && (
                        <FormHelperText error>{error.message}</FormHelperText>
                      )}
                    </FormControl>
                  );
                }

                if (field.type === "range") {
                  return (
                    <FormControl fullWidth error={!!error}>
                      <InputLabel>
                        {field.label}
                        {field.required && " *"}
                      </InputLabel>
                      <RangeDropdown
                        value={controllerField.value}
                        onChange={controllerField.onChange}
                        disabled={isFixedField}
                      />
                      {error && (
                        <FormHelperText error>{error.message}</FormHelperText>
                      )}
                    </FormControl>
                  );
                }

                if (field.type === "icon" || field.type === "logo") {
                  return (
                    <FormControl fullWidth error={!!error}>
                      <InputLabel>
                        {field.label}
                        {field.required && " *"}
                      </InputLabel>
                      {loadingIcons ? (
                        <CircularProgress size={24} />
                      ) : (
                        <Select
                          {...controllerField}
                          value={controllerField.value || ""}
                          label={field.label}
                          disabled={isFixedField}
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
                      {error && (
                        <FormHelperText error>{error.message}</FormHelperText>
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
                    error={!!error}
                    helperText={error?.message || ""}
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

        <Grid item xs={12} sm={6} md={3}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} /> : buttonText}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;