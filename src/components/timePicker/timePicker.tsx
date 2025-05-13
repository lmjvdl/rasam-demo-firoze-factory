import React from "react";
import { TextField, InputAdornment, FormControl } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

const valueToInputText = (value?: DateObject): string => {
  if (!value) return "";
  return value.toString();
};

interface CalendarInputProps {
  value?: DateObject;
  openCalendar?: () => void;
  placeholder?: string;
  disabled?: boolean;
}

function InputContainer({
  openCalendar,
  value,
  placeholder,
  disabled,
}: CalendarInputProps) {
  const text = valueToInputText(value);
  const placeholderInput: string =
    text !== "" ? text : placeholder ? placeholder : "";
  return (
    <>
      <TextField
        required
        variant="outlined"
        fullWidth
        disabled={disabled}
        size="small"
        placeholder={placeholderInput}
        label={placeholder}
        value={text}
        sx={{ minWidth: 200 }}
        onFocus={openCalendar}
        slotProps={{
          input: {
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <CalendarTodayIcon />
              </InputAdornment>
            ),
            label: `${placeholder}`,
            color: "primary",
          },
        }}
      />
    </>
  );
}

export default function CustomTimePicker({
  value,
  onChange,
  placeholder,
  disabled,
}: {
  value: DateObject | undefined;
  onChange?: (selectedDate: DateObject) => void;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <FormControl fullWidth>
      <DatePicker
        render={
          <InputContainer
            value={value}
            placeholder={placeholder}
            disabled={disabled}
          />
        }
        disableDayPicker
        format="HH:mm"
        plugins={[<TimePicker hideSeconds />]}
        value={value}
        onChange={onChange}
        portal
        zIndex={10000}
      />
    </FormControl>
  );
}
