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