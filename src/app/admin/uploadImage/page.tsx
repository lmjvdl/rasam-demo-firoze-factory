"use client";

import MainCard from "@/components/customContiner/MainCard";
import AllContentImageUpload from "./AllContent";
import AddIconDialog from "@/components/adminPanelComponent/addIcon/AddIconDialog";
import { useState } from "react";
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
