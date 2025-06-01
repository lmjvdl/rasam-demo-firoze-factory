import { TitlesColumnsData } from "@/interfaces/admin/general";
import { Report } from "@/interfaces/admin/report";
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
        label: "نام",
        required: true,
        showOnTable: true,
        canEdit: true,
        isAdditionalAction: false,
    },
    {
        id: "product_line_part_info",
        label: "بخش خط تولید",
        required: true,
        optionsKey: "productLinePartList",
        showOnTable: true,
        canEdit: true,
        isSingleSelect: true,
        isAdditionalAction: false,
        render: (row: Report) => row?.product_line_part_info?.name || "نامشخص",
    },
    {
        id: "input_items_info",
        label: "آیتم های ورودی",
        optionsKey: "inputItemsList",
        required: false,
        showOnTable: true,
        isMultiSelect: true,
        canEdit: true,
        isAdditionalAction: false,
        render: (row: Report) =>
            row?.input_items_info?.length
                ? truncateText(row.input_items_info.map((i) => i.name).join(", ")) : "نامشخص"
    },
    {
        id: "output_item_info",
        label: "آیتم خروجی",
        required: false,
        showOnTable: true,
        optionsKey: "outputItemList",
        canEdit: true,
        isMultiSelect: true,
        isAdditionalAction: false,
        render: (row: Report) =>
            row?.output_item_info?.length
                ? truncateText(row.output_item_info.map((i) => i.name).join(", ")) : "نامشخص"
    },
    {
        id: "intervals_info",
        label: "بازه‌های زمانی",
        required: false,
        showOnTable: false,
        optionsKey: "intervalsList",
        canEdit: true,
        isAdditionalAction: false,
        isSingleSelect: true,
        render: (row: Report) =>
            row?.intervals_info?.length
                ? truncateText(row.intervals_info.map((i) => i.name).join(", ")) : "نامشخص"
    },
    {
        id: "api_func",
        label: "نام API تابع",
        required: false,
        showOnTable: false,
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
