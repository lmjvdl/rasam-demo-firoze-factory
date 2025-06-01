import { Contacts } from "@/interfaces/admin/contacts";
import { TitlesColumnsData } from "@/interfaces/admin/general";
import { truncateText } from "@/utils/formatters/truncateText";

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
        label: "نام مخاطب",
        required: true,
        showOnTable: true,
        canEdit: true,
        isAdditionalAction: false,
    },
    {
        id: "phone_number",
        label: "شماره موبایل",
        required: true,
        showOnTable: true,
        canEdit: true,
        isAdditionalAction: false,
    },
    {
        id: "groups",
        label: "گروه ها",
        required: true,
        showOnTable: true,
        canEdit: true,
        isAdditionalAction: false,
        optionsKey: "groupList",
        isMultiSelect: true,
        render: (row: Contacts) =>
            row?.groups?.length
                ? truncateText(row.groups.map((group) => group.name).join(", ")) : "نامشخص"
    },
    {
        id: "permissions",
        label: "دسترسی ها",
        required: true,
        showOnTable: true,
        canEdit: true,
        isAdditionalAction: false,
        optionsKey: "permissionsList",
        isMultiSelect: true,
        render: (row: Contacts) =>
            row?.user_permissions?.length
                ? truncateText(row.user_permissions.map((permission) => permission.name).join(", ")) : "نامشخص"
    },
    {
        id: "actions",
        label: "عملیات",
        isActionColumn: true,
        canEdit: false,
        isAdditionalAction: false,
    },
];
