import {
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { IconPlus, IconSquareRoundedX } from "@tabler/icons-react";
import React from "react";
import { ModalFormType } from "./ApiKey";
import { UseFormReturn } from "react-hook-form";

const AddIp = ({
  form2,
  onSubmitIps,
}: {
  form2: UseFormReturn<ModalFormType>;
  onSubmitIps: (data: ModalFormType) => void;
}) => {
  return (
    <>
      <Typography align="center">افزودن آیپی</Typography>

      <Stack
        sx={{
          overflow: "auto",
          flexGrow: 1,
        }}
      >
        <Stack
          gap={1}
          component={"form"}
          onSubmit={form2.handleSubmit(onSubmitIps)}
          noValidate
          id="ipForm"
          sx={{
            alignItems: "center",
            py: 1,
          }}
        >
          {form2.watch("source_ips.ips")?.map((ip, index) => (
            <TextField
              label="آیپی"
              key={index}
              fullWidth
              {...form2.register(`source_ips.ips.${index}` as const, {
                pattern: {
                  value:
                    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/(3[0-2]|[12]?[0-9])$/,
                  message: "فرمت صحیح نیست",
                },
                validate: (value) => {
                  if (value.trim() === "") {
                    return "آیپی نمیتواند خالی باشد";
                  }
                  return true;
                },
              })}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => {
                          const newValue = form2
                            .watch(`source_ips.ips`)
                            .filter((item) => item !== ip);
                          form2.setValue("source_ips.ips", newValue);
                        }}
                      >
                        <IconSquareRoundedX />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              helperText={
                form2.formState.errors.source_ips?.ips?.[index]?.message
              }
              error={!!form2.formState.errors.source_ips?.ips?.[index]}
            />
          ))}
          <IconButton
            size="small"
            sx={{ width: "fit-content" }}
            color="primary"
            onClick={() => {
              const newValue = form2.watch(`source_ips.ips`) ?? [];
              form2.setValue("source_ips.ips", [...newValue, ""]);
            }} // Append a new IP field
          >
            <IconPlus />
          </IconButton>
        </Stack>
      </Stack>
    </>
  );
};

export default AddIp;
