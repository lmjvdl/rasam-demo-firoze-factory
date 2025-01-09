import { Grid, Typography } from '@mui/material';
import BaalMillCard from './BaalMillCard';


export default function BaalMillLive() {
  const mills = [
    { id: 1, name: 'بالمیل 1', status: 'on' as 'on', current: 122, frequency: 2400, dcVoltage: 220, acVoltage: 200, temperature: 454 },
    { id: 2, name: 'بالمیل 2', status: 'off' as 'off' , current: 0, frequency: 0, dcVoltage: 0, acVoltage: 0, temperature: 0},
    { id: 3, name: 'بالمیل 3', status: 'on' as 'on', current: 122, frequency: 2400, dcVoltage: 220, acVoltage: 200, temperature: 454 },
    { id: 4, name: 'بالمیل 4', status: 'on' as 'on', current: 122, frequency: 2400, dcVoltage: 220, acVoltage: 200, temperature: 454 },
  ];
  

  return (
    <div style={{ padding: '20px' }}>
      <Typography display="inline" variant="h4" gutterBottom>
        <span style={{color: "#0FBDA2", borderRadius: "50px"}}>|</span>        
        بالمیل بچ
      </Typography>
      <Grid container spacing={3} marginBlock={3}>
        {mills.map((mill) => (
        <Grid item xs={12} sm={6} md={3} key={mill.id}>
        <BaalMillCard mill={mill} />
      </Grid>
        ))}
      </Grid>
    </div>
  );
}
