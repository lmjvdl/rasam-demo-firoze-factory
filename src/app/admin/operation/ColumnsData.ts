import { Operation } from "@/interfaces/admin/operation";
import { truncateText } from "@/utils/formatters/truncateText";

export const columns = () => [
    {
        id: "id",
        label: "شناسه",
        showOnTable: false,
        canEdit: false,
        isAdditionalAction: false,
    },
    {
        id: "device_info",
        label: "دستگاه",
        required: true,
        isSingleSelect: true,
        showOnTable: true,
        canEdit: true,
        isAdditionalAction: false,
        optionsKey: "deviceList",
        render: (row: Operation) => row?.device_info?.name || "نامشخص",
    },
    {
        id: "devices_info",
        label: "دستگاه ها",
        required: false,
        isMultiSelect: true,
        showOnTable: true,
        canEdit: true,
        isAdditionalAction: false,
        optionsKey: "deviceList",
        render: (row: Operation) =>
            row?.devices_info?.length
                ? truncateText(row.devices_info.map((device) => device.name).join(", ")) : "نامشخص"
    },
    {
        id: "actions",
        label: "عملیات",
        isActionColumn: true,
        canEdit: false,
        isAdditionalAction: false,
    },
];

