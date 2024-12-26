"use client";
import SelecteAny from "@/components/Autocomplete/SelectAny";
import { useGetProductLines } from "@/hooks/ReactQueryApiHooks/useProductLineApi";
import { useRegisterUser } from "@/hooks/ReactQueryApiHooks/useUserApi";
import { registerUserForm } from "@/interfaces/users";
import { Check, CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Stack,
  SxProps,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import type { Value } from "react-multi-date-picker";
import MyDatePicker from "@/components/DatePicker/MyDatePicker";
const CreateUser = () => {
    const [v, setV] = useState<Value>(new Date());

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<registerUserForm>({
    defaultValues: {
      //   username:'userna'
    },
  });
  const onSubmit: SubmitHandler<registerUserForm> = (data) => console.log(data);
  const icon = <CheckBoxOutlineBlank fontSize="small" />;
  const checkedIcon = <CheckBox fontSize="small" />;
  const sameTextfieldStyle: SxProps = {
    flexGrow: 1,
    minWidth: 300,
    maxWidth: 500,
  };


  return (
    <Stack
      flexWrap={"wrap"}
      flexDirection={"row"}
      gap={2}
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        sx={sameTextfieldStyle}
        label="نام کاربری"
        {...register("username")}
      />
      <TextField
        sx={sameTextfieldStyle}
        label="نام"
        {...register("first_name")}
      />
      <TextField
        sx={sameTextfieldStyle}
        label="نام خانوادگی"
        {...register("last_name")}
      />
      <TextField
        sx={sameTextfieldStyle}
        label="شماره تلفن"
        {...register("phone_number")}
      />
      <TextField
        sx={sameTextfieldStyle}
        label="گذرواژه"
        {...register("password")}
      />
      <TextField
        label="exp_date"
        sx={sameTextfieldStyle}
        defaultValue="test"
        {...register("exp_date")}
      />
      <TextField
        sx={sameTextfieldStyle}
        label="گذرواژه"
        {...register("password")}
      />
      <MyDatePicker
        name="exp_date"
        control={control}
        // error="dsa"
        label="تاریخ انفضاء"
      />
      <Controller
        control={control}
        name="product_line_ids"
        render={({ field }) => (
          <Autocomplete
            {...field}
            value={field.value || []} // Ensure value is always an array
            multiple
            // fullWidth
            sx={sameTextfieldStyle}
            options={[
              { id: 1, name: "perm1", description: "nothing" },
              { id: 2, name: "perm2", description: "nothing" },
              { id: 3, name: "perm3", description: "nothing" },
              { id: 4, name: "perm4", description: "nothing" },
            ]}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            renderOption={(props, option, { selected }) => {
              const { key, ...optionProps } = props;
              return (
                <li key={key} {...optionProps}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.name}
                </li>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="دسترسی ها"
                placeholder="Favorites"
              />
            )}
          />
        )}
      />
      {JSON.stringify(watch())}

      {/* {errors.exampleRequired && <span>This field is required</span>} */}
      <Button type="submit">ایجاد کاربر </Button>
    </Stack>
  );
};

export default CreateUser;
