import { Device } from "@/interfaces/user/layout/layoutBodyPrep";
import { iconMapLayout } from "../icons/LayoutIcon";

export const paramNameMap: Record<string, string> = {
    temperature: "دمای موتور",
    current: "جریان",
    soilSurface: "سطح خاک",
    WeightIncomingSoil: "وزن خاک ورودی",
    OutputSoilWeight: "وزن آب ورودی",
    BurnerTemperature: "دمای مشعل",
    OutletTemperature: "دمای خروجی",
    OutputGranuleWeight: "دبی وزنی گرانول",
    OutputGranuleTemperature: "دمای گرانول خروجی",
    OutputGranuleMoisture: "رطوبت گرانول خروجی",
    WeightSoilEnteringbatchMill: "وزن خاک ورودی",
    WeightIncomingWaterMilliliters: "وزن آب ورودی",
    FlowRate: "دبی پمپ",
    rightEngineTemperature: "دمای موتور راست",
    rightEngineCurrent: "جریان موتور راست",
    leftEngineTemperature: "دمای موتور چپ",
    leftEngineCurrent: "جریان موتور چپ",
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
    SlurryPit: iconMapLayout["SlurryPit"],
    SlurryPump: iconMapLayout["SlurryPump"],
    SprayDryer: iconMapLayout["SprayDryer"],
    VibratingScreen: iconMapLayout["VibratingScreen"],
};
