import { IconButton } from "@mui/material";
import Link from "next/link";
import { IconUserExclamation } from "@tabler/icons-react";

export const columns = () => [
  {
    id: "logo",
    label: "لوگو",
    isActionColumn: false,
    showOnTable: true,
    canEdit: true,
    isAdditionalAction: false,
    isIconSelect: true,
    optionsKey: "iconList",
  },
  {
    id: "id",
    label: "شناسه",
    showOnTable: false,
    canEdit: false,
    isAdditionalAction: false,
  },
  {
    id: "name",
    label: "شرکت",
    showOnTable: true,
    required: true,
    canEdit: true,
    isAdditionalAction: false,
  },
  {
    id: "description",
    label: "توضیحات",
    showOnTable: true,
    canEdit: true,
    isAdditionalAction: false,
  },
  {
    id: "code",
    label: "کد",
    showOnTable: true,
    required: true,
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
  {
    id: "userActions",
    label: "کاربران",
    isActionColumn: false,
    canEdit: false,
    showOnTable: true,
    render: (row: any) => (
      <Link href={`/admin/company/${row.id}/user`} passHref>
        <IconButton 
          aria-label="مشاهده کاربران شرکت"
          sx={{ color: "primary.main" }}
        >
          <IconUserExclamation stroke={2} />
        </IconButton>
      </Link>
    )
  }
];
