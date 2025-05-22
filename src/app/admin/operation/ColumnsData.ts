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
        id: "datatype_operation",
        label: "عملیات",
        isKeyValueObject: true,
        ListKeyObject: "dataTypeList",
        canEdit: true,
        isAdditionalAction: false,
        showOnTable: true,
        required: true,
    },
    {
        id: "device",
        label: "دستگاه",
        required: true,
        isSingleSelect: true,
        showOnTable: true,
        canEdit: true,
        isAdditionalAction: false,
        optionsKey: "deviceList",
        render: (row: Operation) => row?.device?.name || "نامشخص",
    },
    {
        id: "devices",
        label: "دستگاه ها",
        required: false,
        isMultiSelect: true,
        showOnTable: true,
        canEdit: true,
        isAdditionalAction: false,
        optionsKey: "deviceList",
        render: (row: Operation) =>
            row?.devices?.length
                ? truncateText(row.devices.map((device) => device.name).join(", ")) : "نامشخص"
    },
    {
        id: "actions",
        label: "عملیات",
        isActionColumn: true,
        canEdit: false,
        isAdditionalAction: false,
    },
];

