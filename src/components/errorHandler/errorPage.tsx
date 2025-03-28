"use client";
import { Button, Container, Typography, Stack, Box } from "@mui/material";
import Link from "next/link";
import { FallbackProps } from "react-error-boundary";

export default function ErrorPage({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <Container
      sx={{
        py: 10,
        textAlign: "center",
        direction: "rtl",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontWeight: 700,
          fontSize: "220px",
          lineHeight: 1,
          mb: 6,
          color: "grey.300",
          "@media (max-width: 600px)": {
            fontSize: "120px",
          },
        }}
      >
        پوکیدیم
      </Typography>

      <Typography
        variant="h2"
        sx={{
          fontWeight: 700,
          fontSize: "38px",
          "@media (max-width: 600px)": {
            fontSize: "32px",
          },
        }}
      >
        یه باگ توی برنامه پیدا کردی!
      </Typography>

      <Typography
        color="text.secondary"
        variant="body1"
        sx={{
          maxWidth: 500,
          mx: "auto",
          my: 4,
        }}
      >
        یه مشکلی پیش توی برنامه پیش اومده برای کمک، اگه میتونی یه عکس از این
        صفحه بگیر و متخصصای شرکت نشون بده
      </Typography>

      {error && (
        <Box
          component="pre"
          sx={{
            fontFamily: "monospace",
            fontSize: "0.75rem",
            my: 4,
            textAlign: "right",
            direction: "ltr",
            color: "error.main",
            overflowX: "auto",
            p: 2,
            bgcolor: "background.paper",
            borderRadius: 1,
          }}
        >
          {error.stack}
        </Box>
      )}

      <Stack direction="row" justifyContent="center">
        <Button
          variant="contained"
          size="large"
          component={Link}
          href="/"
          onClick={resetErrorBoundary}
          sx={{ mt: 2 }}
        >
          برو به خانه
        </Button>
      </Stack>
    </Container>
  );
}