import DatePicker, { DateObject } from "react-multi-date-picker";
import {  Controller, Control } from "react-hook-form";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { TextField } from "@mui/material";

export default function MyDatePicker({
  control,
  name,
  required,
  error,
  label = "تاریخ",
}: {
  control?: Control<any, any>;
  name: string;
  required?: string | boolean;
  error?: string;
  label?: string;
}) {
  return (
    <>
      <Controller
        control={control}
        name={name}

        rules={{ required: required }} //optional
        render={({
          field: { onChange, name, value },
          fieldState: { invalid, isDirty }, //optional
          formState: { errors }, //optional, but necessary if you want to show an error message
        }) => {
          return (
            <>
              <DatePicker
                style={{width:'100%'}}
                render={
                  <CustomInput
                    
                    error={error}
                    label={label}
                    required={required}
                  />
                }
                value={value || ""}
                onYearChange={({ year, month }) => {
                  const newDate = new DateObject(value).set({
                    day: value?.day > month.length ? month.length : value.day,
                    month: Number(month),
                    year,
                  });
                  onChange(newDate);
                }}
                onMonthChange={({ year, month }) => {
                  const newDate = new DateObject(value).set({
                    day: value.day > month.length ? month.length : value.day,
                    month: Number(month),
                    year,
                  });
                  onChange(newDate);
                }}
                onChange={(date) => {
                  onChange(date?.isValid ? date : "");
                }}
                // format={language === "en" ? "MM/DD/YYYY" : "YYYY/MM/DD"}
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
              />
            </>
          );
        }}
      />
    </>
  );
}

export function CustomInput({
  onFocus,
  value,
  onChange,
  error,
  label,
  required,
}) {
  return (
      <TextField
      sx={{minWidth:'none'}}
        helperText={error ?? null}
        fullWidth
        error={!!error}
        label={label}
        onFocus={onFocus}
        value={value}
        onChange={onChange}
        required={!!required}
      />
  );
  return <input />;
}
