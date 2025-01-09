import React from "react";
import { Box, TextField, IconButton, FormControl, InputAdornment, makeStyles } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import weekends from "react-multi-date-picker/plugins/highlight_weekends";
import persianFa from "./persianFa";

const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

const valueToInputText = (val?: DateObject[]): string => {
  const value = val ? val.toString() : "";
  if (!value) {
    return "";
  }

  const [from, to] = value.split("~").map((date) => date.trim());

  if (!from && !to) {
    return "";
  }

  if (from && !to) {
    return `${from} تا این لحظه`;
  }

  if (from && to) {
    return `${from} تا ${to}`;
  }

  return "";
};

interface CalendarInputProps {
  value?: DateObject[];
  openCalendar?: () => void;
}

function InputContainer({ openCalendar, value }: CalendarInputProps) {
  const text: string = valueToInputText(value)
  const placeholderInput: string = text !== "" ? text : "بازه زمانی";
  return (
      <TextField
        variant="outlined"
        fullWidth
        placeholder={placeholderInput}
        value={text}
        onFocus={openCalendar}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <CalendarTodayIcon />
            </InputAdornment>
          ),
          style: { height: '57px' }
        }}
      />
  );
}

export default function CustomDatePicker({
  value = [],
  onChange,
}: {
  value: DateObject[];
  onChange: (selectedDates: DateObject[]) => void;
}) {

  return (
    <FormControl fullWidth>
      <DatePicker
        render={<InputContainer value={value}/>}
        range
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
