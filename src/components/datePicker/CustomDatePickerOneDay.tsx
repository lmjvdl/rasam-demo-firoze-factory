import React from "react";
import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import weekends from "react-multi-date-picker/plugins/highlight_weekends";
import persianFa from "../../utils/formatters/persianFa";
import { weekDays } from "@/utils/formatters/dateToText";

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
          },
        }}
      />
    </>
  );
}

export default function CustomDatePickerOneDay({
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
        locale={persianFa}
        weekDays={weekDays}
        calendar={persian}
        value={value}
        onChange={onChange}
        plugins={[weekends()]}
        portal
      />
    </FormControl>
  );
}
