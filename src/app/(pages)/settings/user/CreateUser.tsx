"use client";

import { registerUserForm } from "@/interfaces/users";
import {

  Button,
  Stack,

} from "@mui/material";
import { useForm, SubmitHandler,  } from "react-hook-form";

import UserForm from "./UserForm";
const CreateUser = () => {

  const userForm = useForm<registerUserForm>({
    defaultValues: {},
  });
  const { handleSubmit } = userForm;
  const onSubmit: SubmitHandler<registerUserForm> = (data) => console.log(data);

  return (
    <Stack
      flexWrap={"wrap"}
      gap={2}
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <UserForm userForm={userForm} />
      {/* {errors.exampleRequired && <span>This field is required</span>} */}
      <Button sx={{alignSelf:'start'}} type="submit">ایجاد کاربر </Button>
    </Stack>
  );
};

export default CreateUser;
