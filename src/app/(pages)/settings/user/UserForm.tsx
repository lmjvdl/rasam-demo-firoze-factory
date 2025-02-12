import AdvanceAutoComplete from "@/components/AutoComplete/AdvanceAutoComplete";
import MyDatePicker from "@/components/DatePicker/MyDatePicker";
import { registerUserForm } from "@/interfaces/users";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Checkbox,
  Stack,
  SxProps,
  TextField,
} from "@mui/material";
import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";

const UserForm = ({
  userForm,
}: {
  userForm: UseFormReturn<registerUserForm>;
}) => {
  const { register, control, setValue, watch } = userForm;
    const mutualSx1:SxProps = { flex: "1 1 200px" };
  return (
    <Stack flexDirection={"column"} gap={2} alignItems={"start"}>
      <Box sx={{ display: "flex", gap: 2, width: "100%", flexWrap: "wrap" }}>
        <TextField
          sx={{ ...mutualSx1 }}
          label="نام کاربری"
          {...register("username")}
        />
        <TextField
          sx={{ ...mutualSx1 }}
          label="نام"
          {...register("first_name")}
        />
        <TextField
          sx={{ ...mutualSx1 }}
          label="نام خانوادگی"
          {...register("last_name")}
        />
        <TextField
          sx={{ ...mutualSx1 }}
          label="شماره تلفن"
          {...register("phone_number")}
        />
      </Box>
      <Box sx={{ display: "flex", gap: 2, width: "100%", flexWrap: "wrap" }}>
        <TextField
          sx={{ ...mutualSx1 }}
          label="گذرواژه"
          {...register("password")}
        />
        <TextField
          sx={{ ...mutualSx1 }}
          label="گذرواژه"
          {...register("password")}
        />
        <Box sx={{ ...mutualSx1 }}>
          <AdvanceAutoComplete
            multiple={true}
            setValue={(newValue: registerUserForm["product_line_ids"]) => {
              setValue("product_line_ids", newValue);
            }}
            stateOption={[
              { id: 1, name: "perm1", description: "nothing" },
              { id: 2, name: "perm2", description: "nothing" },
              { id: 3, name: "perm3", description: "nothing" },
              { id: 4, name: "perm4", description: "nothing" },
            ]}
            value={watch("product_line_ids") || []}
            uniqeProperty={"id"}
            label="name"
          />
        </Box>
          <Box
            component={MyDatePicker}
            sx={{ ...mutualSx1 }}
            name="exp_date"
            control={control}
            // error="dsa"
            label="تاریخ انقضاء"
          />
        </Box>
    </Stack>
  );
};

export default UserForm;
