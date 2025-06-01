import { FunctionParameter } from "@/interfaces/admin/functionParameter";
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
        id: "function_info",
        label: "تابع",
        required: true,
        showOnTable: true,
        optionsKey: "functionList",
        isSingleSelect: true,
        canEdit: true,
        isAdditionalAction: false,
        render: (row: FunctionParameter) => row?.function_info?.name || "نامشخص",
    },
    {
        id: "actions",
        label: "عملیات",
        isActionColumn: true,
        canEdit: false,
        isAdditionalAction: false,
    },
];
