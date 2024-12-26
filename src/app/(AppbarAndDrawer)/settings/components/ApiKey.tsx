import { registerUserForm } from '@/interfaces/users';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import { Button, Stack, SxProps, TextField } from '@mui/material';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';

const ApiKey = () => {

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
   

      {/* {errors.exampleRequired && <span>This field is required</span>} */}
      <Button type="submit">ایجاد کاربر </Button>
    </Stack>
  );
}

export default ApiKey