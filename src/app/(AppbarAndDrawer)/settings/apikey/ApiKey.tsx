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
import React, { useRef, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import AddIp from "./AddIp";
import ApikeyForm from "./ApikeyForm";

export type UserType = { title: string; id: number };

export type APIKeyInput = {
  user: UserType;
  exp_date: string;
  requestNumber: number;
  unitNumber: number;
  unit: string;
  requestcount: number;
  source_ips: { ips: Ips[] | string[] };
};
export type ModalFormType = { source_ips: { ips: Ips[] | string[] } };

const ApiKey = () => {
  const mainForm = useForm<APIKeyInput>({
    defaultValues: {},
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
    getValues,
  } = mainForm;
  const form2 = useForm<ModalFormType>({
    defaultValues: {},
  });
  const onSubmit: SubmitHandler<APIKeyInput> = (data) => {
    // TODO: call post api
  };

  const [openDialogAddIp, setOpenDialogAddIp] = useState(false);

  const [stateOptionIp, setStateOptionIp] = useState<string[]>([]);

  const onSubmitIps = (data: ModalFormType) => {
    setStateOptionIp(data.source_ips.ips);
    setOpenDialogAddIp(false);
    setValue("source_ips.ips", data.source_ips.ips);
  };
  return (
    <Stack gap={2}>
      <Stack
        flexWrap={"wrap"}
        flexDirection={"row"}
        gap={2}
        id="mainForm"
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <ApikeyForm
          mainForm={mainForm}
          stateOptionIp={stateOptionIp}
          setOpenDialogAddIp={setOpenDialogAddIp}
        />
      </Stack>

      <Modal open={openDialogAddIp} onClose={() => setOpenDialogAddIp(false)}>
        <MainCard
          sx={{
            width: 400,
            minHeight: 400,
            position: "fixed",
            inset: 0,
            m: "auto",
            height: 400,
            gap: 1,
            justifyContent: "start",
          }}
        >
          <AddIp form2={form2} onSubmitIps={onSubmitIps} />
          <Button form="ipForm" type="submit">
            ثبت
          </Button>
        </MainCard>
      </Modal>
      <Button form={"mainForm"} type="submit" sx={{alignSelf:'self-start'}}>
        ایجاد کاربر
      </Button>
    </Stack>
  );
};

export default ApiKey;
