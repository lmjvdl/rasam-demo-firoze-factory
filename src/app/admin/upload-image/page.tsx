// pages/icons.tsx
import IconTable from "@/components/AdminPanelComponent/AddIcon/IconTable";
import { Container, Typography } from "@mui/material";

const IconsPage = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        مدیریت آیکون‌ها
      </Typography>
      <IconTable />
    </Container>
  );
};

export default IconsPage;
