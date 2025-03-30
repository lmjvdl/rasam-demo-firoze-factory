import { FunctionParameter } from "@/interfaces/admin/functionParameter";

export const columns = () => [
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
        id: "function",
        label: "تابع",
        required: true,
        showOnTable: true,
        optionsKey: "functionList",
        isSingleSelect: true,
        canEdit: true,
        isAdditionalAction: false,
        render: (row: FunctionParameter) => row?.function?.name || "نامشخص",
    },
    {
        id: "actions",
        label: "عملیات",
        isActionColumn: true,
        canEdit: false,
        isAdditionalAction: false,
    },
];
