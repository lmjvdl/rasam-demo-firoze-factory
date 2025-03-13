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
      id: "name",
      label: "نام",
      required: true,
      showOnTable: true,
    },
    {
      id: "theme",
      label: "تم",
      required: true,
      showOnTable: true,
    },
    {
      id: "uploaded_at",
      label: "تاریخ آپلود",
      showOnTable: true,
    }
  ];
  