import { useState } from "react";
import {
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { uploadIcon } from "@/app/admin/uploadImage/hooks/useCreate";

interface AddIconDialogProps {
  onClose: () => void;
}

const AddIconDialog = ({ onClose }: AddIconDialogProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [theme, setTheme] = useState<"light" | "dark">("light");
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
    if (!name) {
      setError("لطفاً یک نام وارد کنید.");
      return;
    }

    try {
      await uploadIcon(file, name, theme);
      onClose();
    } catch {
      setError("خطایی در آپلود فایل رخ داده است.");
    }
  };

  return (
    <>
      <DialogContent>
        <TextField
          label="نام آیکون"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          select
          label="تم آیکون"
          value={theme}
          onChange={(e) => setTheme(e.target.value as "light" | "dark")}
          fullWidth
          margin="dense">
          <MenuItem value="light">روشن</MenuItem>
          <MenuItem value="dark">تیره</MenuItem>
        </TextField>
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
