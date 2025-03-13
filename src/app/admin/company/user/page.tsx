"use client";
import { useRouter } from "next/navigation";
import { IconButton } from "@mui/material";
import { IconUserExclamation } from "@tabler/icons-react";

const UserActions = ({ companyId }: { companyId: number }) => {
  const router = useRouter();

  return (
    <IconButton onClick={() => router.push(`/admin/company/user?companyId=${companyId}`)}>
      <IconUserExclamation />
    </IconButton>
  );
};

export default UserActions;
