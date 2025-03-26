export const columns = () => [
    {
        id: "id",
        label: "شناسه",
        showOnTable: false,
        canEdit: false,
        isAdditionalAction: false,
    },
    {
        id: "parameter",
        label: "پارامتر",
        required: true,
        showOnTable: true,
        canEdit: true,
        isAdditionalAction: false,
    },
    {
        id: "value",
        label: "مقدار",
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
