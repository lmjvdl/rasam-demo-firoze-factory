"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
} from "@mui/material";
import { fetchIcons } from "@/app/admin/upload-image/hooks/useView";
import AddIconDialog from "./AddIconDialog";
import { ImageUpload } from "@/interfaces/admin/imageUpload";

const IconTable = () => {
  const [icons, setIcons] = useState<ImageUpload[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchIcons().then((data) => setIcons(data.results));
  }, []);

  const handleUploadSuccess = () => {
    fetchIcons().then((data) => setIcons(data.results));
  };

  return (
    <Paper sx={{ marginTop: "35px", padding: "16px" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        sx={{
          width: "auto",
          maxWidth: "90vw",
          alignSelf: "flex-start",
          mr: "auto",
          mb: "30px",
        }}
      >
        افزودن آیکون
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>آیکون</TableCell>
              <TableCell>تاریخ آپلود</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {icons.map((icon) => (
              <TableRow key={icon.id}>
                <TableCell style={{ textAlign: "center" }}>
                  <img src={icon.icon} alt="icon" width={40} height={40} />
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {new Date(icon.uploaded_at).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <AddIconDialog
          onClose={() => setOpen(false)}
          onUploadSuccess={handleUploadSuccess}
        />
      </Dialog>
    </Paper>
  );
};

export default IconTable;
