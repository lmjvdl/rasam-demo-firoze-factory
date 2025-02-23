import React from "react";
import { TextField, InputAdornment, FormControl } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import weekends from "react-multi-date-picker/plugins/highlight_weekends";
import persianFa from "../../utils/formatters/persianFa";
import { weekDays } from "@/utils/formatters/DateToText";

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
      required
      variant="outlined"
      fullWidth
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
  );
}

export default function CustomDatePickerOneDay({
  value,
  onChange,
}: {
  value: DateObject | undefined;
  onChange?: (selectedDate: DateObject) => void;
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
