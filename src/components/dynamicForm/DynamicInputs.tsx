import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, Grid } from "@mui/material";
import { DynamicInputsProps } from "@/interfaces/ui/inputs/DynamicForm";
import InputWrapper from "./InputWrapper";


const DynamicInputs: React.FC<DynamicInputsProps> = ({ fields, onSubmit }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={2}>
        {fields.map((field, index) => (
          <Grid item xs={12} sm={6} md={3} key={field.name + index}>
            <Controller
              control={control}
              name={field.name}
              defaultValue={field.value || ""}
              rules={{ required: field.required }}
              render={({ field: formField }) => (
                <InputWrapper
                  field={formField}
                  config={field}
                  error={!!errors[field.name]}
                  helperText={errors[field.name]?.message?.toString()}
                />
              )}
            />
          </Grid>
        ))}
      </Grid>
      <Box mt={3}>
        <Button type="submit" variant="contained" color="primary">
          ارسال فرم
        </Button>
      </Box>
    </form>
  );
};

export default DynamicInputs;
