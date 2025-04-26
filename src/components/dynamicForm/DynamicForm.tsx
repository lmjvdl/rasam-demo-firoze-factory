import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, Grid } from "@mui/material";
import { DynamicInputConfig } from "@/interfaces/ui/inputs/DynamicForm";
import InputWrapper from "./InputWrapper";

interface DynamicFormProps {
  fields: DynamicInputConfig[];
  onSubmit: (data: any) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ fields, onSubmit }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={2}>
        {fields.map((field, index) => (
          <Grid item xs={12} sm={6} key={field.name + index}>
            <Controller
              control={control}
              name={field.name}
              defaultValue={field.value || ""}
              render={({ field: formField }) => (
                <InputWrapper
                  field={formField}
                  config={field}
                  helperText={errors[field.name]?.message as string | undefined} error={false}                />
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

export default DynamicForm;
