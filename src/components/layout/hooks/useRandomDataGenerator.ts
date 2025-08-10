// hooks/useAllDevicesRandomData.ts
import { useEffect } from "react";
import startRandomGenerator from "@/utils/homeless/randomGenerator";
import { Device } from "@/interfaces/user/layout/layoutBodyPrep";

interface UseAllDevicesRandomDataProps {
  devices: Device[];
  updateDevice: (id: string, data: Record<string, string>) => void;
  setDeviceData: (id: string, data: Record<string, string>) => void;
  isActive: boolean;
}

export const useAllDevicesRandomData = ({
  devices,
  updateDevice,
  setDeviceData,
  isActive,
}: UseAllDevicesRandomDataProps) => {
  useEffect(() => {
    if (!isActive) return;

    const stopFunctions: (() => void)[] = [];

    devices.forEach((device) => {
      if (device.status === "blue") {
        // Temperature
        const stopTemp = startRandomGenerator(40, 90, "C°", (val) => {
          updateDevice(device.id, { temprature: val });
          setDeviceData(device.id, { temprature: val });
        });

        // Current
        const stopCurrent = startRandomGenerator(30, 50, "A", (val) => {
          updateDevice(device.id, { current: val });
          setDeviceData(device.id, { current: val });
        });

        // Soil Surface
        const stopSoilSurface = startRandomGenerator(1, 10, "m", (val) => {
          updateDevice(device.id, { soilSurface: val });
          setDeviceData(device.id, { soilSurface: val });
        });

        // Weight Incoming Soil
        const stopWeightIncomingSoil = startRandomGenerator(100, 300, "kg/h", (val) => {
          updateDevice(device.id, { WeightIncomingSoil: val });
          setDeviceData(device.id, { WeightIncomingSoil: val });
        });

        // Output Soil Weight
        const stopOutputSoilWeight = startRandomGenerator(80, 280, "kg/h", (val) => {
          updateDevice(device.id, { OutputSoilWeight: val });
          setDeviceData(device.id, { OutputSoilWeight: val });
        });

        // Burner Temperature
        const stopBurnerTemperature = startRandomGenerator(300, 600, "°C", (val) => {
          updateDevice(device.id, { BurnerTemperature: val });
          setDeviceData(device.id, { BurnerTemperature: val });
        });

        // Outlet Temperature
        const stopOutletTemperature = startRandomGenerator(100, 200, "°C", (val) => {
          updateDevice(device.id, { OutletTemperature: val });
          setDeviceData(device.id, { OutletTemperature: val });
        });

        // Output Granule Weight
        const stopOutputGranuleWeight = startRandomGenerator(50, 150, "kg/h", (val) => {
          updateDevice(device.id, { OutputGranuleWeight: val });
          setDeviceData(device.id, { OutputGranuleWeight: val });
        });

        // Output Granule Temperature
        const stopOutputGranuleTemperature = startRandomGenerator(100, 300, "°C", (val) => {
          updateDevice(device.id, { OutputGranuleTemperature: val });
          setDeviceData(device.id, { OutputGranuleTemperature: val });
        });

        // Output Granule Moisture
        const stopOutputGranuleMoisture = startRandomGenerator(1, 20, "%", (val) => {
          updateDevice(device.id, { OutputGranuleMoisture: val });
          setDeviceData(device.id, { OutputGranuleMoisture: val });
        });

        // Monopump Current
        const stopWeightSoilEnteringbatchMill = startRandomGenerator(10, 30, "A", (val) => {
          updateDevice(device.id, { WeightSoilEnteringbatchMill: val });
          setDeviceData(device.id, { WeightSoilEnteringbatchMill: val });
        });

        // Monopump Temperature
        const stopWeightIncomingWaterMilliliters = startRandomGenerator(40, 100, "°C", (val) => {
          updateDevice(device.id, { WeightIncomingWaterMilliliters: val });
          setDeviceData(device.id, { WeightIncomingWaterMilliliters: val });
        });

        // Monopump Flow Rate
        const stopFlowRate = startRandomGenerator(40, 100, "m³/h", (val) => {
          updateDevice(device.id, { FlowRate: val });
          setDeviceData(device.id, { FlowRate: val });
        });

        // Right engine temprature for slurry pit
        const stopRightEngineTemperature = startRandomGenerator(40, 90, "°C", (val) => {
          updateDevice(device.id, { rightEngineTemperature: val });
          setDeviceData(device.id, { rightEngineTemperature: val });
        });

        // Right engine current for slurry pit
        const stopRightEngineCurrent = startRandomGenerator(30, 90, "A", (val) => {
          updateDevice(device.id, { rightEngineCurrent: val });
          setDeviceData(device.id, { rightEngineCurrent: val });
        });

        // Left engine temprature for slurry pit
        const stopLeftEngineTemperature = startRandomGenerator(40, 90, "°C", (val) => {
          updateDevice(device.id, { leftEngineTemperature: val });
          setDeviceData(device.id, { leftEngineTemperature: val });
        });

        // Right engine current for slurry pit
        const stopLeftEngineCurrent = startRandomGenerator(30, 50, "A", (val) => {
          updateDevice(device.id, { leftEngineCurrent: val });
          setDeviceData(device.id, { leftEngineCurrent: val });
        });

        stopFunctions.push(
          stopTemp,
          stopCurrent,
          stopSoilSurface,
          stopWeightIncomingSoil,
          stopOutputSoilWeight,
          stopBurnerTemperature,
          stopOutletTemperature,
          stopOutputGranuleWeight,
          stopOutputGranuleTemperature,
          stopOutputGranuleMoisture,
          stopWeightSoilEnteringbatchMill,
          stopWeightIncomingWaterMilliliters,
          stopFlowRate,
          stopRightEngineTemperature,
          stopLeftEngineTemperature,
          stopRightEngineCurrent,
          stopLeftEngineCurrent
        );
      }
    });

    return () => {
      stopFunctions.forEach((stop) => stop());
    };
  }, [devices, isActive, updateDevice, setDeviceData]);
};