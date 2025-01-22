import { Container } from "@mui/material";
import ChartTabs from "./live/ChartTabs";


const testDate = {
  data: [
    {
      device_name: "post2",
      device_id: 0,
      device_name_fa: "پست 1",
      allowed_data: {
        phase1_current: "جریان فاز 1",
        phase2_current: "جریان فاز 2",
        phase3_current: "جریان فاز 3", 
        middle_current: "جریان متوسط",
        middle_voltage: "ولتاژ متوسط",
        active_power: "توان اکتیو",
        apparent_power: "توان ظاهری",
        active_energy_delivered: "انرژی فعال تحویلی",
        power_factor: "ضریب توان",
      },
      data: [
        {
          time: 102015215121,
          phase1_current: 10,
          phase2_current: 70,
          phase3_current: 15,
          middle_current: 80,
          middle_voltage: 510,
          active_power: 123,
          apparent_power: 14,
          active_energy_delivered: 25,
          power_factor: 98,
        },
      ],
    },
    {
      device_name: "post2",
      device_id: 1,
      device_name_fa: "پست 2",
      allowed_data: {
        phase1_current: "جریان فاز 1",
        phase2_current: "جریان فاز 2",
        phase3_current: "جریان فاز 3", 
        middle_current: "جریان متوسط",
        middle_voltage: "ولتاژ متوسط",
        active_power: "توان اکتیو",
        apparent_power: "توان ظاهری",
        active_energy_delivered: "انرژی فعال تحویلی",
        power_factor: "ضریب توان",
      },
      data: [
        {
          time: 102015215121,
          phase1_current: 10,
          phase2_current: 70,
          phase3_current: 15,
          middle_current: 80,
          middle_voltage: 510,
          active_power: 123,
          apparent_power: 14,
          active_energy_delivered: 25,
          power_factor: 98,
        },
      ],
    },
    {
      device_name: "post3",
      device_id: 2,
      device_name_fa: "پست 3",
      allowed_data: {
        phase1_current: "جریان فاز 1",
        phase2_current: "جریان فاز 2",
        phase3_current: "جریان فاز 3", 
        middle_current: "جریان متوسط",
        middle_voltage: "ولتاژ متوسط",
        active_power: "توان اکتیو",
        apparent_power: "توان ظاهری",
        active_energy_delivered: "انرژی فعال تحویلی",
        power_factor: "ضریب توان",
      },
      data: [
        {
          time: 102015215121,
          phase1_current: 10,
          phase2_current: 70,
          phase3_current: 15,
          middle_current: 80,
          middle_voltage: 510,
          active_power: 123,
          apparent_power: 14,
          active_energy_delivered: 25,
          power_factor: 98,
        },
      ],
    },
    {
      device_name: "post4",
      device_id: 3,
      device_name_fa: "پست 4",
      allowed_data: {
        phase1_current: "جریان فاز 1",
        phase2_current: "جریان فاز 2",
        phase3_current: "جریان فاز 3", 
        middle_current: "جریان متوسط",
        middle_voltage: "ولتاژ متوسط",
        active_power: "توان اکتیو",
        apparent_power: "توان ظاهری",
        active_energy_delivered: "انرژی فعال تحویلی",
        power_factor: "ضریب توان",
      },
      data: [
        {
          time: 102015215121,
          phase1_current: 10,
          phase2_current: 70,
          phase3_current: 15,
          middle_current: 80,
          middle_voltage: 510,
          active_power: 123,
          apparent_power: 14,
          active_energy_delivered: 25,
          power_factor: 98,
        },
      ],
    },
  ],
};


const HomePage: React.FC = () => {
  return (
    <Container>
      <ChartTabs data={testDate.data} />
    </Container>
  );
};

export default HomePage;