"use client"

import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

interface SchemaOption {
  name: string;
  value: number
  label: string;
  children?: React.Component;
}

interface OptionTabsProps {
  options: Array<SchemaOption>;
}

function DynamicTabs({ options }: OptionTabsProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Tabs value={value} onChange={handleChange}>
      {options.map((item, index) => (
        <Tab key={index} label={item.label} href={item.name} />
      ))}
    </Tabs>
  );
}

export default DynamicTabs;