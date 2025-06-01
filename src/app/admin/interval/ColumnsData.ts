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
        id: "name",
        label: "نام",
        required: true,
        showOnTable: true,
        canEdit: true,
        isAdditionalAction: false,
    },
    {
        id: "duration",
        label: "مدت زمان",
        required: false,
        showOnTable: true,
        canEdit: true,
        isAdditionalAction: false,
    },
    {
        id: "is_shift",
        label: "شیفت",
        required: true,
        showOnTable: true,
        canEdit: true,
        isAdditionalAction: false,
        isSingleSelect: true,
    },
    {
        id: "actions",
        label: "عملیات",
        isActionColumn: true,
        canEdit: false,
        isAdditionalAction: false,
    },
];
