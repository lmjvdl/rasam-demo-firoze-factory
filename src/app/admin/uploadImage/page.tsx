"use client";

import MainCard from "@/components/customContiner/MainCard";
import AllContentImageUpload from "./AllContent";
import AddIconDialog from "@/components/adminPanelComponent/addIcon/AddIconDialog";
import { useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";

const IconsPage = () => {
  const [open, setOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSuccess = () => {
    setRefreshKey(prev => prev + 1);
    handleClose();
  };

  return (
    <MainCard>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{
          width: "auto",
          maxWidth: "90vw",
          ml: "17px",
          alignSelf: "flex-start",
          mt: "30px",
        }}
      >
        افزودن تصویر جدید
      </Button>
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>افزودن تصویر جدید</DialogTitle>
        <DialogContent>
          <AddIconDialog 
            onClose={handleClose}
            onSuccess={handleSuccess}
          />
        </DialogContent>
      </Dialog>
      
      <AllContentImageUpload key={refreshKey} />
    </MainCard>
  );
};

export default IconsPage;