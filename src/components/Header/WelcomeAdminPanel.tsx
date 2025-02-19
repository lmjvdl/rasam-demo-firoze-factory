import { Typography } from "@mui/material";

export default function WelcomeAdminPanel() {
  return (
    <Typography
      component="span"
      sx={{
        flexGrow: 1,
        textAlign: "center",
      }}
    >
      به پنل ادمین{" "}
      <Typography
        sx={{
          color: "var(--mui-palette-primary-main)",
          display: "inline-block",
          fontWeight: "bold",
        }}
      >
        شرکت رسام
      </Typography>{" "}
      خوش آمدید
    </Typography>
  );
}
