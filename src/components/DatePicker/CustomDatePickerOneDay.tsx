import React from "react";
import {
  Box,
  TextField,
  InputAdornment,
  useTheme,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import weekends from "react-multi-date-picker/plugins/highlight_weekends";
import persianFa from "./persianFa";
import useOrientation from "@/hooks/UI/useOrientation";
import "./mobile.css";
import "./dark.css";

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
      }}
      fullWidth
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
  const { isMobile } = useOrientation();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Box>
      <DatePicker
        className={`${isMobile ? "rmdp-mobile" : ""} ${isDarkMode ? "bg-dark" : ""}`}
        render={<InputContainer />}
        calendar={persian}
        locale={persianFa}
        weekDays={weekDays}
        calendarPosition="bottom-center"
        value={value}
        onChange={onChange}
        plugins={[weekends()]}
        portal
      />
    </Box>
  );
}
