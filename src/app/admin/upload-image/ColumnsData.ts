export const columns = () => [
    {
        id: "icon",
        label: "تصویر",
        isImage: true,
        required: true,
        showOnTable: true,
        canEdit: true,
    },
    {
        id: "id",
        label: "شناسه",
        required: true,
        showOnTable: false,
    },
    {
        id: "uploaded_at",
        label: "تاریخ آپلود",
        showOnTable: true,
    }
];
