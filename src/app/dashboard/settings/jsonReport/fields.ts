import useDeviceQuery from "@/app/admin/alarm/hooks/useDeviceList";

export const getFormFields = () => {
    const getDeviceList = useDeviceQuery();
  
    return [
      {
        name: "device",
        label: "دستگاه ها",
        type: "select",
        required: false,
        options:
          getDeviceList.data?.map((device) => ({
            label: device.name,
            value: device.id,
          })) || [],
      },
      {
        name: "end_time",
        label: "تاریخ شروع",
        type: "oneDateDropdown",
        required: true,
      },
      {
        name: "start_time",
        label: "تاریخ پایان",
        type: "oneDateDropdown",
        required: true,
      },
    ];
  };