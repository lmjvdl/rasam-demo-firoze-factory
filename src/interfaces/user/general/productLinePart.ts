export type Part = {
    id: number;
    name: string;
    code: string;
    LightIcon: string | null;
    DarkIcon: string | null;
    live_type: {
      id: number;
      name: 'oneSensor' | 'multiSensor' | 'packaging' | 'chart';
    }
};
    
export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
  
export interface PartTabsWithDropdownProps {
    parts: Part[];
}  