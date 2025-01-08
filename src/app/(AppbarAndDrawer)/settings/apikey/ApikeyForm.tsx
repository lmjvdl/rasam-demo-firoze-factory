"use client";
import AdvanceAutoComplete from "@/components/Autocomplete/AdvanceAutoComplete";
import MainCard from "@/components/CustomContiner/MainCard";
import { IconPlus, IconRefresh, IconSquareRoundedX } from "@tabler/icons-react";
import { Ips } from "@/interfaces/api-keys";
import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  Modal,
  Stack,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { UserType } from "./ApiKey";
const sameTextfieldStyle: SxProps = {
  flex: {
    xl: "0 0 calc(25% - 12px)",
    lg: "0 0 calc(25% - 12px)",
    md: "1 0 300px",
    xs: "1 0 300px",
  },
};
const unitList = [
  { value: "secs", label: "ثانیه" },
  { value: "hours", label: "ساعت" },
  { value: "mins", label: "دقیقه" },
  { value: "days", label: "روز" },
  { value: "months", label: "ماه" },
];

const ApikeyForm = ({
  mainForm,
  stateOptionIp,
  setOpenDialogAddIp,
}: {
  mainForm: any;
  stateOptionIp: Array<any>;
  setOpenDialogAddIp: Dispatch<SetStateAction<boolean>>;
}) => {
  const { register, watch, setValue, getValues } = mainForm;
  const userData: any = [];
  return (
    <>
      <Box sx={{ ...sameTextfieldStyle }}>
        <AdvanceAutoComplete
          stateOption={userData || []}
          value={getValues("user")}
          setValue={(newValue: UserType) => {
            setValue("user", newValue);
          }}
          TFPlaceholder={"کاربر"}
          multiple={false}
          uniqeProperty="id"
          label="title"
        />
      </Box>

      <TextField
        sx={sameTextfieldStyle}
        label="تعداد درخواست"
        type="number"
        {...register("requestNumber")}
      />
      <TextField
        sx={sameTextfieldStyle}
        label="تعداد واحد"
        type="number"
        {...register("unitNumber")}
      />
      <TextField
        id="outlined-select-currency"
        defaultValue=""
        select
        label="انتخاب واحد"
        helperText=""
        sx={sameTextfieldStyle}
      >
        {unitList.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <Box sx={{ ...sameTextfieldStyle }}>
        <AdvanceAutoComplete
          multiple={true}
          stateOption={stateOptionIp || []}
          value={watch("source_ips.ips") || []}
          TFPlaceholder={"آیپی"}
          setValue={(newValue: string[]) => {
            setValue("source_ips.ips", newValue);
          }}
          extraComponents={
            <Stack
              alignItems={"start"}
              sx={{ ml: 3, p: 0.5 }}
              onClick={() => setOpenDialogAddIp(true)}
            >
              <Button startIcon={<Add />} variant="text">
                افزودن آیپی
              </Button>
            </Stack>
          }
          limitTags={10}
        />
      </Box>
    </>
  );
};

export default ApikeyForm;
