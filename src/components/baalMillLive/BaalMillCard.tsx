import { Card, CardContent, Button, Typography, Box, Divider} from '@mui/material';

interface BaalMillProps {
  mill: {
    id: number;
    name: string;
    status: 'on' | 'off';
    current?: number;
    frequency?: number;
    dcVoltage?: number;
    acVoltage?: number;
    temperature?: number;
  };
}

export default function BaalMillCard({ mill }: BaalMillProps) {
  return (
    <Card 
        sx={{ boxShadow: 3 }}
        style={{ backgroundColor: 
          mill.status === 'on' ? '#ffff' 
          : '#f0f0f0' }}>
      <CardContent>
          <Box display="flex" alignItems="center" sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6">{mill.name}</Typography>
            <Button disableElevation variant="outlined" color={mill.status === 'on' ? 'success' : 'inherit'} sx={{ mr: 1 }}>
            {mill.status === 'on' ? 'روشن' : 'خاموش'}
            </Button>
          </Box>
          <div style={{ marginTop: '10px', display: "flex", flexDirection: "column", gap:"20px", marginBlockStart: "20px" }}>
          <Divider />
            <Typography>جریان دستگاه: {mill.current} A</Typography>
            <Typography>فرکانس دستگاه: {mill.frequency} HZ</Typography>
            <Typography>ولتاژ DC دستگاه: {mill.dcVoltage} V</Typography>
            <Typography>ولتاژ AC دستگاه: {mill.acVoltage} V</Typography>
            <Typography>دمای دستگاه: {mill.temperature} C</Typography>
          </div>
      </CardContent>
    </Card>
  );
}
