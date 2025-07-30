// store/layoutLiveStore.ts
import { demoData } from '@/components/fakeData/layout/fakeData';
import { DeviceState } from '@/interfaces/user/layout/layoutBodyPrep';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useLayoutLiveStore = create<DeviceState>()(
  devtools((set) => ({
    devices: [],
    setDeviceData: (id, data) => 
      set(state => ({
        devices: state.devices.map(device => 
          device.id === id ? {...device, ...data} : device
        )
      }))
  }))
);

export const initializeStore = (preloadedState: Partial<DeviceState>) => {
  return useLayoutLiveStore.setState({
    devices: preloadedState.devices || demoData.devices,
  });
};