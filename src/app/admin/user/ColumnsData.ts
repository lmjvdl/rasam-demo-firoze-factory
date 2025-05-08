import { User } from "@/interfaces/admin/user";
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
        id: "first_name",
        label: "نام",
        required: false,
        showOnTable: true,
        canEdit: true,
        isAdditionalAction: false,
    },
    {
        id: "last_name",
        label: "نام خانوادگی",
        required: false,
        showOnTable: true,
        canEdit: true,
        isAdditionalAction: false,
    },
    {
        id: "username",
        label: "نام کاربری",
        showOnTable: true,
        required: true,
        canEdit: true,
        isAdditionalAction: false,
    },
    {
        id: "phone_number",
        label: "شماره موبایل",
        showOnTable: true,
        required: true,
        canEdit: true,
        isAdditionalAction: false,
    },
    {
        id: "email",
        label: "ایمیل",
        isActionColumn: false,
        showOnTable: false,
        required: false,
        canEdit: true,
        isAdditionalAction: false,
    },
    {
        id: "is_active",
        label: "وضعیت",
        required: true,
        showOnTable: false,
        isActionColumn: false,
        canEdit: true,
        isAdditionalAction: false,
    },
    {
        id: "groups",
        label: "گروه ها",
        required: true,
        showOnTable: true,
        optionsKey: "groupList",
        isMultiSelect: true,
        canEdit: true,
        isAdditionalAction: false,
        render: (row: User) =>
            row?.groups?.length
                ? truncateText(row.groups.map((group) => group.name).join(", ")) : "نامشخص"
    },
    {
        id: "product_lines",
        label: "خط تولیدها",
        required: true,
        showOnTable: true,
        optionsKey: "productLineList",
        isMultiSelect: true,
        canEdit: true,
        isAdditionalAction: false,
        render: (row: User) =>
            row?.product_lines?.length
                ? truncateText(row.product_lines.map((product_line) => product_line.name).join(", ")) : "نامشخص"
    },
    {
        id: "actions",
        label: "عملیات",
        isActionColumn: true,
        canEdit: false,
        isAdditionalAction: false,
    },
];
