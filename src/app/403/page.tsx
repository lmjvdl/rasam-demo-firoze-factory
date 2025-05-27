"use client";

import { Box, Button, CardContent, Typography, useTheme } from "@mui/material";
import MainCard from "@/components/customContiner/MainCard";
import { useRouter } from "next/navigation";
import ErrorIcon from "@mui/icons-material/ErrorOutline";

const Page403 = () => {
  const router = useRouter();
  const theme = useTheme();

  const handleGoToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <MainCard>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "89.7vh",
          textAlign: "center",
          padding: 4,
          backgroundColor: theme.palette.background.default,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <ErrorIcon
          sx={{
            fontSize: 80,
            color: theme.palette.error.main,
            mb: 2,
          }}
        />
        <Typography
          variant="h3"
          color="text.primary"
          gutterBottom
          sx={{ fontWeight: 700 }}
        >
          403 - دسترسی غیرمجاز
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          paragraph
          sx={{ maxWidth: 500, mb: 4 }}
        >
          متأسفیم، به نظر می‌رسد شما مجوز کافی برای دسترسی به این صفحه را ندارید. لطفاً با مدیر سیستم تماس بگیرید یا به داشبورد اصلی بازگردید.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<ErrorIcon />}
          onClick={handleGoToDashboard}
          sx={{
            paddingX: 4,
            paddingY: 1.5,
            borderRadius: 1,
            textTransform: "none",
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          بازگشت به داشبورد
        </Button>
      </CardContent>
    </MainCard>
  );
};

export default Page403;