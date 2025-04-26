import { DynamicInputConfig } from "@/interfaces/ui/inputs/DynamicForm";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import DynamicInput from "./DynamicInput";

const DynamicInputController: React.FC<DynamicInputConfig> = (inputConfig) => {
  const { name, type } = inputConfig;
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <DynamicInput
          {...inputConfig}
          value={field.value}
          onChange={(value: any) => {
            if (type === "datepicker" || type === "datepicker-single") {
              return field.onChange(value);
            }
            field.onChange(value.target.value);
          }}
        />
      )}
    />
  );
};

export default DynamicInputController;
