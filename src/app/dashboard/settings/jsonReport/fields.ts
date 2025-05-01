import useDeviceQuery from "@/app/admin/operation/hooks/useDeviceList";

export const getFormFields = () => {
    const getDeviceList = useDeviceQuery();
  
    return [
      {
        name: "devices",
        label: "دستگاه ها",
        type: "multiselect",
        required: false,
        options:
          getDeviceList.data?.map((device) => ({
            label: device.name,
            value: device.id,
          })) || [],
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