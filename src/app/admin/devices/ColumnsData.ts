import { Device } from "@/interfaces/admin/device";
import { TitlesColumnsData } from "@/interfaces/admin/general";
import { truncateText } from "@/utils/formatters/truncateText";

export const columns = (): TitlesColumnsData[] => [
    {
        id: "name",
        label: "نام",
        required: true,
        showOnTable: true,
        canEdit: true,
        isAdditionalAction: false,
    },
    {
        id: "id",
        label: "شناسه",
        showOnTable: false,
        canEdit: false,
        isAdditionalAction: false,
    },
    {
        id: "product_line_part",
        label: "خط تولید جزئی",
        required: true,
        showOnTable: true,
        canEdit: true,
        isAdditionalAction: false,
        optionsKey: "productLinePartList",
        isSingleSelect: true,
        render: (row: Device) => row?.product_line_part?.name || "نامشخص",
    },
    {
        id: "data_type",
        label: "نوع داده",
        required: true,
        showOnTable: true,
        canEdit: true,
        isAdditionalAction: false,
        optionsKey: "dataTypeList",
        isMultiSelect: true,
        render: (row: Device) =>
            row?.data_type?.length
                ? truncateText(row.data_type.map((data_type) => data_type.name).join(", ")) : "نامشخص"
    },
    {
        id: "code",
        label: "کد",
        required: true,
        showOnTable: false,
        canEdit: true,
        isAdditionalAction: false,
    },
    {
        id: "on_off_identifier",
        label: "مشخص کننده خاموشی",
        required: true,
        showOnTable: true,
        canEdit: true,
        isAdditionalAction: false,
        optionsKey: "dataTypeList",
        isSingleSelect: true,
        render: (row: Device) => row?.on_off_identifier?.name || "نامشخص",
    },
    {
        id: "value",
        label: "مقدار مشخص کننده خاموشی",
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
