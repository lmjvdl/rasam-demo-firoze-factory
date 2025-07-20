import { create } from "zustand";
import { Device } from "@/interfaces/user/layout/layoutBodyPrep";
import { demoData } from "@/components/fakeData/layout/fakeData";

interface LayoutLiveState {
  devices: Device[];
  setDeviceData: (id: string, data: Partial<Device>) => void;
}

export const useLayoutLiveStore = create<LayoutLiveState>((set) => ({
  devices: demoData.devices,
  setDeviceData: (id, data) =>
    set((state) => ({
      devices: state.devices.map((d) =>
        d.id === id ? { ...d, ...data } : d
      ),
    })),
}));
