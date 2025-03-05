import { useState } from "react";
import { DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { uploadIcon } from "@/app/admin/upload-image/hooks/useCreate";

interface AddIconDialogProps {
  onClose: () => void;
  onUploadSuccess: () => void;
}

const AddIconDialog = ({ onClose, onUploadSuccess }: AddIconDialogProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("لطفاً یک فایل انتخاب کنید.");
      return;
    }

    try {
      await uploadIcon(file);
      onUploadSuccess();
      onClose();
    } catch (error) {
      setError("خطایی در آپلود فایل رخ داده است.");
    }
  };

  return (
    <>
      <DialogTitle>افزودن آیکون</DialogTitle>
      <DialogContent>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="warning" variant="outlined">
          لغو
        </Button>
        <Button onClick={handleUpload} color="primary" variant="contained">
          آپلود
        </Button>
      </DialogActions>
    </>
  );
};

export default AddIconDialog;
