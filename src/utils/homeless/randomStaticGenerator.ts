
export function getRandomTemperature(): string {
  const temp = Math.floor(Math.random() * (75 - 45 + 1)) + 45;
  return `\u200E${temp} °C`;
}

export function getRandomSoilSurface(): string {
  const temp = Math.floor(Math.random() * (25 - 16 + 1)) + 16;
  return `\u200E${temp} m`;
}

export function getRandomCurrent(): string {
  const current = Math.floor(Math.random() * (50 - 30 + 1)) + 30;
  return `\u200E${current} A`;
}

export function getRandomWeightIncomingSoil(): string {
  const weight = Math.floor(Math.random() * (300 - 100 + 1)) + 100;
  return `\u200E${weight} kg/h`;
}

export function getRandomOutputSoilWeight(): string {
  const weight = Math.floor(Math.random() * (280 - 80 + 1)) + 80;
  return `\u200E${weight} kg/h`;
}

export function getRandomBurnerTemperature(): string {
  const temp = Math.floor(Math.random() * (600 - 300 + 1)) + 300;
  return `\u200E${temp} °C`;
}

export function getRandomOutletTemperature(): string {
  const temp = Math.floor(Math.random() * (200 - 100 + 1)) + 100;
  return `\u200E${temp} °C`;
}

export function getRandomOutputGranuleWeight(): string {
  const weight = Math.floor(Math.random() * (150 - 50 + 1)) + 50;
  return `\u200E${weight} kg/h`;
}

export function getRandomOutputGranuleTemperature(): string {
  const temp = Math.floor(Math.random() * (300 - 100 + 1)) + 100;
  return `\u200E${temp} °C`;
}

export function getRandomOutputGranuleMoisture(): string {
  const moisture = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
  return `\u200E${moisture} %`;
}

export function getRandomWeightSoilEnteringbatchMill(): string {
  const current = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
  return `\u200E${current} kg`;
}

export function getRandomWeightIncomingWaterMilliliters(): string {
  const temp = Math.floor(Math.random() * (100 - 40 + 1)) + 40;
  return `\u200E${temp} L`;
}

export function getRandomFlowRate(): string {
  const temp = Math.floor(Math.random() * (100 - 40 + 1)) + 40;
  return `\u200E${temp} m³/h`;
}

export function getRandomRightEngineTemperature(): string {
  const temp = Math.floor(Math.random() * (100 - 40 + 1)) + 40;
  return `\u200E${temp} °C`;
}

export function getRandomRightEngineCurrent(): string {
  const temp = Math.floor(Math.random() * (100 - 40 + 1)) + 40;
  return `\u200E${temp} A`;
}

export function getRandomLeftEngineTemperature(): string {
  const temp = Math.floor(Math.random() * (100 - 40 + 1)) + 40;
  return `\u200E${temp} °C`;
}

export function getRandomLeftEngineCurrent(): string {
  const temp = Math.floor(Math.random() * (100 - 40 + 1)) + 40;
  return `\u200E${temp} A`;
}
