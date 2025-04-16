import { Group } from "@/interfaces/admin/group";
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
        id: "name",
        label: "نام",
        required: true,
        showOnTable: true,
        canEdit: true,
        isAdditionalAction: false,
    },
    {
        id: "permissions",
        label: "دسترسی‌ها",
        required: false,
        isMultiSelect: true,
        optionsKey: "permissionList",
        showOnTable: true,
        canEdit: true,
        isAdditionalAction: false,
        render: (row: Group) =>
            row?.permissions?.length
                ? truncateText(row.permissions.map((p) => p.name).join(", ")) : "نامشخص"
    },
    {
        id: "actions",
        label: "عملیات",
        isActionColumn: true,
        canEdit: false,
        isAdditionalAction: false,
    },
];

