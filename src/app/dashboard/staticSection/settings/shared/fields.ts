import { useDownloadFileExtraOptions } from "./hooks/useDeviceQuery";

export const getFormFields = () => {
  const { deviceOptions } = useDownloadFileExtraOptions();
  
    return [
      {
        name: "devices",
        label: "دستگاه ها",
        type: "multiselect",
        required: false,
        options: deviceOptions
      },
      {
        name: "start_time",
        label: "تاریخ شروع",
        placeholder: "تاریخ شروع",
        type: "oneDateDropdown",
        required: true,
      },
      {
        name: "end_time",
        label: "تاریخ پایان",
        placeholder: "تاریخ پایان",
        type: "oneDateDropdown",
        required: true,
      },
    ];
  };