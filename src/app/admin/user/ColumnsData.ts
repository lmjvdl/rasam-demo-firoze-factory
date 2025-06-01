import { TitlesColumnsData } from "@/interfaces/admin/general";
import { User } from "@/interfaces/admin/user";
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
        canEdit: false,
        isAdditionalAction: false,
    },
    {
        id: "phone_number",
        label: "شماره موبایل",
        showOnTable: false,
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
        id: "position",
        label: "سمت کاری",
        isActionColumn: false,
        isSingleSelect: true, 
        optionsKey: "positionList",
        showOnTable: true,
        required: false,
        canEdit: true,
        isAdditionalAction: false,
        render: (row: User) => row?.position?.name || "نامشخص",
    },
    {
        id: "groups",
        label: "گروه ها",
        required: false,
        showOnTable: false,
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
        required: false,
        showOnTable: false,
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
