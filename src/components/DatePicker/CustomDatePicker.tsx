import React from "react";
import { Box, TextField, IconButton } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import weekends from "react-multi-date-picker/plugins/highlight_weekends";
import persianFa from "./persianFa";
import "./mobile.css";
import "./dark.css";
import useOrientation from "@/hooks/UI/useOrientation";

const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

const valueToInputText = (value?: string[] | any): string => {
  if (!Array.isArray(value) || value.length === 0) return "";

  if (value.length === 1) {
    const [from] = value;
    if (!from) return "";
    return `${from}  تا این لحظه`;
  }

  if (value.length === 2) {
    const [from, to] = value;
    if (!from || !to) return "";
    return `${from} تا ${to}`;
  }
  
  return value.join(",");
};


interface CalendarInputProps {
  value?: string[];
  openCalendar?: () => void;
}

function InputContainer({ openCalendar, value }: CalendarInputProps) {
  const text = valueToInputText(Array.isArray(value) ? value : []);
  const placeholderInput: string = text !== "" ? text : "تاریخ";
  console.log(placeholderInput)
  return (
    <Box>
      <TextField
        variant="outlined"
        placeholder={placeholderInput}
        aria-label="بازه زمانی"
        onFocus={openCalendar}
        value={text}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <IconButton onClick={openCalendar}>
              <CalendarTodayIcon />
            </IconButton>
          ),
        }}
        fullWidth
      />
    </Box>
  );
}

export default function CustomDatePicker({
  value,
  onChange,
}: {
  value: DateObject[];
  onChange: (selectedDates: DateObject[]) => void;
}) {
  const { isMobile } = useOrientation();

  return (
    <Box sx={{ width: "100%" }}>
      <DatePicker
        className={isMobile ? "rmdp-mobile" : ""}
        containerClassName="datepicker-container"
        render={<InputContainer />}
        range
        calendar={persian}
        locale={persianFa}
        weekDays={weekDays}
        calendarPosition="bottom-center"
        value={value}
        onChange={onChange}
        plugins={[weekends()]}
        shadow={false}
        portal
      />
    </Box>
  );
}
