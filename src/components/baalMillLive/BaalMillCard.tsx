import { BaalMillProps } from '@/interfaces/preparingBody/live';
import { Card, CardContent, Button, Typography, Box, Divider } from '@mui/material';

export default function BaalMillCard({ container }: BaalMillProps) {
  return (
    <Card 
      sx={{ boxShadow: 3 }}
      style={{ backgroundColor: 
        container?.online === true ? '#ffff' 
        : '#f0f0f0' }}>
      <CardContent>
        <Box display="flex" alignItems="center" sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">{container?.device}</Typography>
          <Button disableElevation variant="outlined" color={container?.online === true ? 'success' : 'inherit'} sx={{ mr: 1 }}>
            {container?.online === true ? 'روشن' : 'خاموش'}
          </Button>
        </Box>
        <div style={{ marginTop: '10px', display: "flex", flexDirection: "column", gap:"20px", marginBlockStart: "20px" }}>
          <Divider />
          <Typography>جریان دستگاه: {container?.data.current} A</Typography>
          <Typography>فرکانس دستگاه: {container?.data.frequency} HZ</Typography>
          <Typography>ولتاژ DC دستگاه: {container?.data.dcVoltage} V</Typography>
          <Typography>ولتاژ AC دستگاه: {container?.data.acVoltage} V</Typography>
          <Typography>دمای دستگاه: {container?.data.temperature} C</Typography>
        </div>
      </CardContent>
    </Card>
  );
}