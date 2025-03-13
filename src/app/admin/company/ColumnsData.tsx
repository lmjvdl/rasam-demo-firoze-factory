import { IconButton } from "@mui/material";
import { IconUserExclamation } from "@tabler/icons-react";

export const columns = (handleUsersView: (companyId: number) => void, selectedCompanyId: number | null, viewUsersOpen: boolean, userList: { id: number; user: number }[]) => [
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
    id: "logo",
    label: "لوگو",
    isActionColumn: false,
    showOnTable: false,
    canEdit: true,
    isAdditionalAction: false,
    isIconSelect: true, 
    optionsKey: "iconList",
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
      <>
        <IconButton onClick={() => handleUsersView(row.id)}>
          <IconUserExclamation />
        </IconButton>
        {selectedCompanyId === row.id && viewUsersOpen && (
          <div>
            <ul>
              {userList.map((user) => (
                <li key={user.id}>{user.user}</li>
              ))}
            </ul>
          </div>
        )}
      </>
    ),
  },
];
