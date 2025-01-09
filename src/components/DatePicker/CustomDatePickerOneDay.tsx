import React from "react";
import {
  Box,
  TextField,
  InputAdornment,
  FormControl,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import weekends from "react-multi-date-picker/plugins/highlight_weekends";
import persianFa from "./persianFa";

const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

const valueToInputText = (value?: DateObject): string => {
  if (!value) return "";
  return value.toString();
};

interface CalendarInputProps {
  value?: DateObject;
  openCalendar?: () => void;
}

function InputContainer({ openCalendar, value }: CalendarInputProps) {
  const text = valueToInputText(value);
  const placeholderInput: string = text !== "" ? text : "تاریخ";
  return (
      <TextField
        variant="outlined"
        fullWidth
        size="small"
        placeholder={placeholderInput}
        value={text}
        sx={{ minWidth: 200 }}
        onFocus={openCalendar}
        slotProps={
          {
            input: {
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <CalendarTodayIcon />
                </InputAdornment>
              ),
            }
          }
        }
      />
  );
}

export default function CustomDatePickerOneDay({
  value,
  onChange,
}: {
  value: DateObject | undefined;
  onChange: (selectedDate: DateObject) => void;
}) {
  return (
    <FormControl fullWidth>
      <DatePicker
        render={<InputContainer value={value} />}
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
