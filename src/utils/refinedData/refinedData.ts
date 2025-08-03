import { Device } from "@/interfaces/user/layout/layoutBodyPrep";
import { iconMapLayout } from "../icons/LayoutIcon";

export const paramNameMap: Record<string, string> = {
    temperature: "دما",
    current: "جریان",
    soilSurface: "سطح خاک",
    WeightIncomingSoil: "وزن خاک ورودی",
    OutputSoilWeight: "وزن خاک خروجی",
    BurnerTemperature: "دمای مشعل",
    OutletTemperature: "دمای خروجی",
    OutputGranuleWeight: "وزن گرانول خروجی",
    OutputGranuleTemperature: "دمای گرانول خروجی",
    OutputGranuleMoisture: "رطوبت گرانول خروجی",
    MonopumpCurrent: "جریان مونوپمپ",
    MonopumpTemprature: "دمای مونوپمپ",
  };
  

export const unitMap: Record<string, string> = {
    temperature: "C°",
    current: "A",
    soilSurface: "m",
};

export const iconComponents: Record<
    Device["type"],
    React.FC<{ width: number; height: number }>
> = {
    BatchBaalMill: iconMapLayout["BatchBaalMill"],
    ContinuesBallMill: iconMapLayout["ContinuesBallMill"],
    GranuleSillo: iconMapLayout["GranuleSillo"],
    SlurryPitRight: iconMapLayout["SlurryPitRight"],
    SlurryPitLeft: iconMapLayout["SlurryPitLeft"],
    SlurryPump: iconMapLayout["SlurryPump"],
    SprayDryer: iconMapLayout["SprayDryer"],
    VibratingScreen: iconMapLayout["VibratingScreen"],
};
