import { Report } from "@/interfaces/admin/report";
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
        id: "product_line_part",
        label: "بخش خط تولید",
        required: true,
        optionsKey: "productLinePartList",
        showOnTable: true,
        canEdit: true,
        isSingleSelect: true,
        isAdditionalAction: false,
        render: (row: Report) => row?.product_line_part?.name || "نامشخص",
    },
    {
        id: "input_items",
        label: "آیتم های ورودی",
        optionsKey: "inputItemsList",
        required: false,
        showOnTable: true,
        isMultiSelect: true,
        canEdit: true,
        isAdditionalAction: false,
        render: (row: Report) =>
            row?.input_items?.length
                ? truncateText(row.input_items.map((i) => i.name).join(", ")) : "نامشخص"
    },
    {
        id: "output_item",
        label: "آیتم خروجی",
        required: false,
        showOnTable: true,
        optionsKey: "outputItemList",
        canEdit: true,
        isSingleSelect: true,
        isAdditionalAction: false,
        render: (row: Report) => row?.ouput_item?.name || "نامشخص",
    },
    {
        id: "intervals",
        label: "بازه‌های زمانی",
        required: false,
        showOnTable: true,
        canEdit: true,
        isAdditionalAction: false,
        render: (row: Report) =>
            row?.intervals?.length
                ? truncateText(row.intervals.map((i) => i.name).join(", ")) : "نامشخص"
    },
    {
        id: "api_func",
        label: "نام API تابع",
        required: false,
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
