"use client"

import React, { useState } from "react";
import {
  Button,
  Grid,
  TextField,
  MenuItem,
  Typography,
  Paper,
} from "@mui/material";
import { DateObject } from "react-multi-date-picker";
import OneDayDropdown from "@/components/FiltersReportDropDown/OneDay";

// const validationSchema = Yup.object({
//   lineId: Yup.string().required("خط را انتخاب کنید"),
//   shift: Yup.string().required("شیفت را انتخاب کنید"),
// });

export default function InputCenter() {
  const [date, setDate] = useState(new DateObject());

  //   const formik = useFormik({
  //     initialValues: {
  //       lineId: "10",
  //       shift: "1",
  //     }
  //   });

  return (
    <>
      <form>
        <Grid container spacing={2} justifyContent="center">
          <Grid item sm={6} xl={4}>
            <TextField select fullWidth label="خط" name="lineId">
              <MenuItem value="10">خط 6</MenuItem>
            </TextField>
          </Grid>

          <Grid item sm={6} xl={4}>
            <OneDayDropdown value={date} onChange={setDate} />
          </Grid>

          <Grid item sm={6} xl={4}>
            <TextField select fullWidth label="انتخاب شیفت" name="shift">
              <MenuItem value="1">شیفت صبح</MenuItem>
              <MenuItem value="2">شیفت ظهر</MenuItem>
              <MenuItem value="3">شیفت شب</MenuItem>
            </TextField>
          </Grid>

          <Grid item sm={6} xl={4}>
            <Button fullWidth variant="contained" type="submit">
              دریافت اطلاعات
            </Button>
          </Grid>
        </Grid>
      </form>

      <Paper elevation={3} style={{ margin: "50px 0", padding: "20px" }}>
        <Typography variant="h6" align="center"></Typography>
      </Paper>
    </>
  );
}
