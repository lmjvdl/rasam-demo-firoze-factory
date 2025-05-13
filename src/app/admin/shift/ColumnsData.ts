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
        id: "start_date",
        label: "تاریخ شروع",
        type: "date",
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
