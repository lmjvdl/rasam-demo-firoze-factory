import { TextField } from "@mui/material";

export function CustomInput({ onFocus, value, onChange }) {
    return <TextField label='تاریخ' onFocus={onFocus} value={value} onChange={onChange}
  
    />;
}
