import { Shift } from "@/interfaces/admin/shift";

export const columns = () => [
      {
        id: "id",
        label: "شناسه",
        showOnTable: false,
        canEdit: false,
      },
      {
        id: "name",
        label: "نام شیفت",
        type: "text",
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
        type: "date",
        showOnTable: false,
        required: true,
        placeholder: "تاریخ شروع",
        canEdit: true,
      },
      {
        id: "end_date",
        label: "تاریخ پایان",
        type: "date",
        required: true,
        placeholder: "تاریخ پایان",
        showOnTable: false,
        canEdit: true
      },
      {
        id: "start_time",
        label: "ساعت شروع",
        type: "time",
        required: true,
        placeholder: "ساعت شروع",
        canEdit: true
      },
      {
        id: "end_time",
        label: "ساعت پایان",
        placeholder: "ساعت پایان",
        type: "time",
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
