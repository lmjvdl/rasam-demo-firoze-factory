import { useState } from "react";
import { useForm } from "react-hook-form";
import OneDayDropdown from "@/components/filtersReportDropDown/OneDay";
import { Button, Grid, MenuItem, Paper, TextField } from "@mui/material";
import { DateObject } from "react-multi-date-picker";
import { IFormInputReceiceInformation } from "@/interfaces/packaging/fillInformation";

export default function ReciverInformation() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInputReceiceInformation>();

  const [date, setDate] = useState<DateObject>(new DateObject());

  const onSubmit = (data: IFormInputReceiceInformation) => {
    const formData = { ...data, date };
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper sx={{ p: 2 }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={5.8} xl={2.8}>
            <TextField
              select
              fullWidth
              label="خط"
              {...register("lineId", { required: "خط را انتخاب کنید" })}
              error={!!errors.lineId}
              helperText={errors.lineId?.message}
            >
              <MenuItem value="10">خط 6</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={5.8} xl={2.8}>
            <OneDayDropdown
              value={date}
              onChange={(selectedDate) => {
                setDate(selectedDate);
                setValue("date", selectedDate, { shouldValidate: true });
              }}
            />
            {errors.date && (
              <p style={{ color: "red", fontSize: "0.8rem", marginTop: "4px" }}>
               تاریخ را انتخاب کنید
              </p>
            )}
          </Grid>

          <Grid item xs={12} sm={5.8} xl={2.8}>
            <TextField
              select
              fullWidth
              label="انتخاب شیفت"
              {...register("shift", { required: "شیفت را انتخاب کنید" })}
              error={!!errors.shift}
              helperText={errors.shift?.message}
            >
              <MenuItem value="1">شیفت صبح</MenuItem>
              <MenuItem value="2">شیفت ظهر</MenuItem>
              <MenuItem value="3">شیفت شب</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={5.8} xl={2.8}>
            <Button fullWidth variant="contained" type="submit">
              دریافت اطلاعات
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
}
