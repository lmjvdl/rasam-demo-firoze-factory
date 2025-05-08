import { UserCompany } from "@/interfaces/admin/userCompany";
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
    id: "user",
    label: "کاربر",
    showOnTable: true,
    required: true,
    canEdit: false,
    isAdditionalAction: false,
  },
  {
    id: "company",
    label: "شرکت",
    showOnTable: true,
    canEdit: true,
    isAdditionalAction: false,
  },
  {
    id: "groups",
    label: "گروه ها",
    showOnTable: true,
    required: true,
    isMultiSelect: true,
    optionsKey: "groupList",
    canEdit: true,
    isAdditionalAction: false,
    render: (row: UserCompany) =>
      row?.groups?.length
          ? truncateText(row.groups.map((group) => group.name).join(", ")) : "نامشخص"
  },
  {
    id: "permissions",
    label: "دسترسی ها",
    showOnTable: true,
    optionsKey: "permissionList",
    required: true,
    isMultiSelect: true,
    canEdit: true,
    isAdditionalAction: false,
    render: (row: UserCompany) =>
      row?.permissions?.length
          ? truncateText(row.permissions.map((permission) => permission.name).join(", ")) : "نامشخص"
  },
  {
    id: "actions",
    label: "عملیات",
    isActionColumn: true,
    canEdit: false,
    isAdditionalAction: false,
  },
];
