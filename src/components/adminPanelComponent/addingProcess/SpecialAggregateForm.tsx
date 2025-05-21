import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
  OutlinedInput,
  CircularProgress,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

interface DeviceOption {
  label: string;
  value: number;
}

interface ApiResponse {
  id: number;
  name: string;
}

interface Props {
  deviceOptions: DeviceOption[];
  onInitialSubmit: (deviceIds: number[]) => Promise<ApiResponse[]>;
  onFinalSubmit: (finalData: {
    datatype_operation: Record<string, "sum" | "avg"> | null;
    device: number;
    devices: number[];
  }) => Promise<void>;
}

const CustomDeviceFormDialog: React.FC<Props> = ({
  deviceOptions,
  onInitialSubmit,
  onFinalSubmit,
}) => {
  const [open, setOpen] = useState(false);
  const [initialSubmitted, setInitialSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataTypes, setDataTypes] = useState<ApiResponse[]>([]);
  const [selectedDevices, setSelectedDevices] = useState<DeviceOption[]>([]);
  const { control, handleSubmit, watch, reset, trigger } = useForm();

  const selectedDeviceIds = watch("device_ids") || [];

  const handleOpen = () => {
    reset();
    setInitialSubmitted(false);
    setDataTypes([]);
    setSelectedDevices([]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInitialSubmit = async () => {
    const isValid = await trigger("device_ids");
    if (!isValid) return;
  
    const selectedDeviceIds = watch("device_ids") || [];
  
    setLoading(true);
    try {
      const response = await onInitialSubmit(selectedDeviceIds);
      const filteredDevices = deviceOptions.filter((device) =>
        selectedDeviceIds.includes(device.value)
      );
      setSelectedDevices(filteredDevices);
      setDataTypes(response);
      setInitialSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleFinalSubmit = async (formData: any) => {
    const datatype_operation: Record<string, "sum" | "avg"> = {};
    dataTypes.forEach((item) => {
      datatype_operation[item.id.toString()] =
        formData[`datatype_${item.id}`] || "sum";
    });

    if (!formData.device) {
      console.error("دستگاه اصلی باید انتخاب شود");
      return;
    }

    const finalPayload = {
      datatype_operation:
        Object.keys(datatype_operation).length > 0 ? datatype_operation : null,
      device: formData.device,
      devices: selectedDevices.map((d) => d.value),
    };

    await onFinalSubmit(finalPayload);
    handleClose();
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{
          width: "auto",
          maxWidth: "90vw",
          ml: "17px",
          alignSelf: "flex-start",
          mt: "30px",
        }}
      >
        افزودن مورد جدید
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>تنظیمات دستگاه</DialogTitle>
        <DialogContent>
          {!initialSubmitted ? (
            <>
              <Controller
                name="device_ids"
                control={control}
                defaultValue={[]}
                rules={{
                  validate: (value) =>
                    value.length > 0 || "حداقل یک دستگاه باید انتخاب شود",
                }}
                render={({ field, fieldState }) => (
                  <FormControl
                    fullWidth
                    sx={{ marginBlock: "10px" }}
                    error={!!fieldState.error}
                  >
                    <InputLabel>دستگاه</InputLabel>
                    <Select
                      {...field}
                      multiple
                      input={<OutlinedInput label="دستگاه" />}
                      renderValue={(selected) =>
                        (selected as number[])
                          .map(
                            (val) =>
                              deviceOptions.find((opt) => opt.value === val)
                                ?.label
                          )
                          .join(", ")
                      }
                    >
                      {deviceOptions.map((device) => (
                        <MenuItem key={device.value} value={device.value}>
                          <Checkbox
                            checked={field.value.includes(device.value)}
                          />
                          <ListItemText primary={device.label} />
                        </MenuItem>
                      ))}
                    </Select>
                    {fieldState.error && (
                      <p
                        style={{
                          color: "red",
                          marginTop: "5px",
                          fontSize: "0.875rem",
                        }}
                      >
                        {fieldState.error.message}
                      </p>
                    )}
                  </FormControl>
                )}
              />

              <Button
                onClick={handleInitialSubmit}
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "تایید و ادامه"}
              </Button>
            </>
          ) : (
            <form onSubmit={handleSubmit(handleFinalSubmit)}>
              {dataTypes.map((item) => (
                <Controller
                  key={item.id}
                  name={`datatype_${item.id}`}
                  control={control}
                  defaultValue="sum"
                  render={({ field }) => (
                    <FormControl fullWidth margin="normal">
                      <InputLabel>{item.name}</InputLabel>
                      <Select {...field} label={item.name}>
                        <MenuItem value="sum">sum</MenuItem>
                        <MenuItem value="avg">avg</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              ))}

              <Controller
                name="device"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl fullWidth sx={{ marginBlock: "5px" }}>
                    <InputLabel>دستگاه مورد نظر</InputLabel>
                    <Select {...field} label="دستگاه مورد نظر">
                      {deviceOptions.map((device) => (
                        <MenuItem key={device.value} value={device.value}>
                          {device.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />

              <DialogActions sx={{ mt: 2 }}>
                <Button onClick={handleClose}>لغو</Button>
                <Button type="submit" variant="contained" color="primary">
                  ثبت نهایی
                </Button>
              </DialogActions>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomDeviceFormDialog;
