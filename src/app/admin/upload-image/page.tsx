"use client";

import ModalForm from "@/components/AdminPanelComponent/AddingProcess/ModalForm";
import MainCard from "@/components/CustomContiner/MainCard";
import AllContentImageUpload from "./AllContent";
import { uploadIcon } from "./hooks/useCreate";
import AddIconDialog from "@/components/AdminPanelComponent/AddIcon/AddIconDialog";
import { useState } from "react";
import { ImageUpload } from "@/interfaces/admin/imageUpload";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";

const IconsPage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  return (
    <MainCard>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{
          width: "auto",
          maxWidth: "90vw",
          alignSelf: "flex-start",
          mr: "auto",
          mt: "30px",
        }}
      >
        افزودن تصویر جدید
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>افزودن تصویر جدید</DialogTitle>
        <DialogContent>
          <AddIconDialog onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
      <AllContentImageUpload />
    </MainCard>
  );
};

export default IconsPage;
