import React from "react";
import { TextField, FormControl, InputAdornment } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import weekends from "react-multi-date-picker/plugins/highlight_weekends";
import persianFa from "../../utils/formatters/persianFa";
import { CalendarInputProps } from "@/interfaces/ui/inputs/DynamicInputs";
import { valueToInputText, weekDays } from "@/utils/formatters/dateToText";


function InputContainer({ openCalendar, value, disabled }: CalendarInputProps) {
  const text: string = valueToInputText(value)
  const placeholderInput: string = text !== "" ? text : "بازه زمانی";
  return (
      <TextField
        variant="outlined"
        fullWidth
        disabled= {disabled}
        size="small"
        placeholder={placeholderInput}
        value={text}
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

export default function CustomDatePicker({
  value = [],
  onChange,
  disabled
}: {
  value: DateObject[];
  onChange: (selectedDates: DateObject[]) => void;
  disabled?: boolean;
}) {

  return (
    <FormControl fullWidth>
      <DatePicker
        render={<InputContainer value={value} disabled={disabled}/>}
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
