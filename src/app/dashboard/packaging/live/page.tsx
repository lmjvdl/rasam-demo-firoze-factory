import { PackagingLiveCard } from "@/components/packagingLive/PackagingLiveCard";
import MainCard from "@/components/customContiner/MainCard";
import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import {
  IconCalendarTime,
  IconSum,
  IconBrandAppleNews,
  IconAspectRatio,
} from "@tabler/icons-react";

const Live = () => {
  return (
    <MainCard sx={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      <Paper elevation={5}>
        <Grid container spacing={2} sx={{ width: { xs: "90%", md: "95%" }, margin: "20px" }}>
          <Grid
            item
            xs={12}
            md={3}
            sx={{ marginBottom: { xs: 2, md: 0 } }}
          >
            <Typography variant="h4" sx={{ marginBottom: "20px" }}>
              خط 1
            </Typography>
            <Box>
              <Grid container spacing={1}>
                <Grid item>
                  <IconCalendarTime stroke={2} />
                </Grid>
                <Grid item>تاریخ به روزرسانی:</Grid>
                <Grid
                  item
                  sx={{ color: "var(--mui-palette-primary-main)" }}
                >
                  17/10/1403
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container spacing={1}>
                <Grid item>
                  <IconSum stroke={2} />
                </Grid>
                <Grid item>کل کاشی تولیدی از اول شیفت:</Grid>
                <Grid
                  item
                  sx={{ color: "var(--mui-palette-primary-main)" }}
                >
                  2121
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container spacing={1}>
                <Grid item>
                  <IconBrandAppleNews stroke={2} />
                </Grid>
                <Grid item>طرح:</Grid>
                <Grid
                  item
                  sx={{ color: "var(--mui-palette-primary-main)" }}
                >
                  300698F1-YAR
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container spacing={1}>
                <Grid item>
                  <IconAspectRatio stroke={2} />
                </Grid>
                <Grid item>ابعاد:</Grid>
                <Grid
                  item
                  sx={{ color: "var(--mui-palette-primary-main)" }}
                >
                  ۶۰×۹۰
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid container spacing={2}>
              {[...Array(9)].map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <PackagingLiveCard
                    header={<Typography fontWeight={500}>درجه ۴</Typography>}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={5}>
        <Grid container spacing={2} sx={{ width: { xs: "90%", md: "95%" }, margin: "20px" }}>
          <Grid
            item
            xs={12}
            md={3}
            sx={{ marginBottom: { xs: 2, md: 0 } }}
          >
            <Typography variant="h4" sx={{ marginBottom: "20px" }}>
              خط 2
            </Typography>
            <Box>
              <Grid container spacing={1}>
                <Grid item>
                  <IconCalendarTime stroke={2} />
                </Grid>
                <Grid item>تاریخ به روزرسانی:</Grid>
                <Grid
                  item
                  sx={{ color: "var(--mui-palette-primary-main)" }}
                >
                  19/10/1404
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container spacing={1}>
                <Grid item>
                  <IconSum stroke={2} />
                </Grid>
                <Grid item>کل کاشی تولیدی از اول شیفت:</Grid>
                <Grid
                  item
                  sx={{ color: "var(--mui-palette-primary-main)" }}
                >
                  100
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container spacing={1}>
                <Grid item>
                  <IconBrandAppleNews stroke={2} />
                </Grid>
                <Grid item>طرح:</Grid>
                <Grid
                  item
                  sx={{ color: "var(--mui-palette-primary-main)" }}
                >
                  30F1-sara
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container spacing={1}>
                <Grid item>
                  <IconAspectRatio stroke={2} />
                </Grid>
                <Grid item>ابعاد:</Grid>
                <Grid
                  item
                  sx={{ color: "var(--mui-palette-primary-main)" }}
                >
                  20*2
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid container spacing={2}>
              {[...Array(9)].map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <PackagingLiveCard
                    header={<Typography fontWeight={500}>درجه ۴</Typography>}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </MainCard>
  );
};

export default Live;