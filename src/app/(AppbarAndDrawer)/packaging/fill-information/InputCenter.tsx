"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Grid, TextField, Paper } from "@mui/material";
import DesignAndSize from "./designAndSize";
import ReciverInformation from "./receiveInformation";

type IFormInput = {
  tile_design: string;
  aspect_ratio: string;
  head_shift?: string;
  supervisor?: string;
  shear?: number;
  production_planning_stops?: number;
  stop_title?: string;
  outer_stops?: number;
  stop_outer_title?: string;
  technical_stoppage_electricity?: number;
  mechanical_technical_stop?: number;
  technical_stoppage_facilities?: number;
  miscellaneous_technical_stoppage?: number;
  number_of_tiles?: number;
};

export default function InputCenter() {
  const { register, handleSubmit } = useForm();
  const [isResponseReceived, setIsResponseReceived] = useState<boolean>(false);

  return (
    <>
      <ReciverInformation></ReciverInformation>
      <Paper
        elevation={1}
        style={{ margin: "20px 0", padding: "25px 20px 40px 20px" }}
      >
        <form>
          <Grid container columnGap={2} columns={12} rowGap={2}>
            <DesignAndSize
              aspect_ratio="100*200"
              design="tia2145"
            ></DesignAndSize>
            <Grid item xs={12} sm={5.8} xl={2.8}>
              <TextField fullWidth label="سرشیفت" placeholder="نام سرشیفت" />
            </Grid>
            <Grid item xs={12} sm={5.8} xl={2.8}>
              <TextField
                fullWidth
                label="سوپروایزر"
                placeholder="نام سوپروایزر"
              />
            </Grid>
            <Grid item xs={12} sm={5.8} xl={2.8}>
              <TextField
                fullWidth
                type="number"
                label="برشی(متر مربع)"
                placeholder="برشی(متر مربع)"
              />
            </Grid>
            <Grid item xs={12} sm={5.8} xl={2.8}>
              <TextField
                fullWidth
                type="number"
                label="توقفات برنامه ریزی شده"
                placeholder="توقفات برنامه ریزی شده(دقیقه)"
              />
            </Grid>
            <Grid item xs={12} sm={5.8} xl={2.8}>
              <TextField fullWidth label="عنوان توقف" placeholder="شرح توقف" />
            </Grid>
            <Grid item xs={12} sm={5.8} xl={2.8}>
              <TextField
                fullWidth
                type="number"
                label="توقفات بیرونی"
                placeholder="توقفات بیرونی(دقیقه)"
              />
            </Grid>
            <Grid item xs={12} sm={5.8} xl={2.8}>
              <TextField
                fullWidth
                label="عنوان توقف بیرونی"
                placeholder="شرح توقف بیرونی"
              />
            </Grid>
            <Grid item xs={12} sm={5.8} xl={2.8}>
              <TextField
                fullWidth
                type="number"
                label="توقف فنی برق"
                placeholder="توقف فنی برق (دقیقه)"
              />
            </Grid>
            <Grid item xs={12} sm={5.8} xl={2.8}>
              <TextField
                fullWidth
                type="number"
                label="توقف فنی مکانیکی"
                placeholder="توقف فنی مکانیکی (دقیقه)"
              />
            </Grid>
            <Grid item xs={12} sm={5.8} xl={2.8}>
              <TextField
                fullWidth
                type="number"
                label="توقف فنی تاسیسات"
                placeholder="توقف فنی تاسیسات(دقیقه)"
              />
            </Grid>
            <Grid item xs={12} sm={5.8} xl={2.8}>
              <TextField
                fullWidth
                type="number"
                label="توقف فنی متفرقه"
                placeholder="توقف فنی متفرقه (دقیقه)"
              />
            </Grid>
            <Grid item xs={12} sm={5.8} xl={2.8}>
              <TextField
                fullWidth
                type="number"
                label="تعداد کاشی"
                placeholder="تعداد کاشی"
              />
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Grid
        container
        sx={{ margin: "40px 0 40px 0" }}
        alignContent="center"
        justifyContent="center"
      >
        <Grid xs={12} sm={12} xl={4}>
          <Button fullWidth type="submit">
            ثبت شیفت
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
