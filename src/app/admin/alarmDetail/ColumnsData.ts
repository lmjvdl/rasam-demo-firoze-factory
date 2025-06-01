import { AlarmDetail } from "@/interfaces/admin/alarmDetail";
import { TitlesColumnsData } from "@/interfaces/admin/general";


export const columns = (): TitlesColumnsData[] => [
    {
        id: "id",
        label: "شناسه",
        showOnTable: false,
        canEdit: false,
        isAdditionalAction: false,
    },
    {
        id: "parameter_info",
        label: "پارامتر",
        required: true,
        showOnTable: true,
        canEdit: true,
        isSingleSelect: true,
        optionsKey: "parameterList",
        isAdditionalAction: false,
        render: (row: AlarmDetail) => row?.parameter_info?.name || "نامشخص",
    },
    {
        id: "alarm_info",
        label: "هشدار",
        required: true,
        showOnTable: true,
        canEdit: true,
        isSingleSelect: true,
        optionsKey: "alarmList",
        isAdditionalAction: false,
        render: (row: AlarmDetail) => row?.alarm_info?.name || "نامشخص",
    },
    {
        id: "value",
        label: "مقدار",
        required: true,
        showOnTable: true,
        canEdit: true,
        isAdditionalAction: false,
    },
    {
        id: "actions",
        label: "عملیات",
        isActionColumn: true,
        canEdit: false,
        isAdditionalAction: false,
    },
];
