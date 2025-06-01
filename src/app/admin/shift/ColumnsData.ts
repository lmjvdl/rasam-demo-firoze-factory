import { TitlesColumnsData } from "@/interfaces/admin/general";
import { Shift } from "@/interfaces/admin/shift";

export const columns = (): TitlesColumnsData[] => [
      {
        id: "id",
        label: "شناسه",
        showOnTable: false,
        canEdit: false,
      },
      {
        id: "name",
        label: "نام شیفت",
        required: true,
        canEdit: true
      },
      {
        id: "company",
        label: "شرکت",
        required: true,
        showOnTable: true,
        canEdit: true,
        isAdditionalAction: false,
        optionsKey: "companyList",
        isSingleSelect: true,
        render: (row: Shift) => row?.company?.name || "نامشخص",
    },
      {
        id: "start_date",
        label: "تاریخ شروع",
        showOnTable: false,
        required: true,
        placeholder: "تاریخ شروع",
        canEdit: true,
      },
      {
        id: "end_date",
        label: "تاریخ پایان",
        required: true,
        placeholder: "تاریخ پایان",
        showOnTable: false,
        canEdit: true
      },
      {
        id: "start_time",
        label: "ساعت شروع",
        required: true,
        placeholder: "ساعت شروع",
        canEdit: true
      },
      {
        id: "end_time",
        label: "ساعت پایان",
        placeholder: "ساعت پایان",
        required: true,
        canEdit: true
      },
      {
        id: "actions",
        label: "عملیات",
        isActionColumn: true,
        canEdit: false,
    },
];
