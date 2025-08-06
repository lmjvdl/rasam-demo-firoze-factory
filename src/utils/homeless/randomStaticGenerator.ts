
export function getRandomTemperature(): string {
  const temp = Math.floor(Math.random() * (75 - 45 + 1)) + 45;
  return `${temp}C°`;
}

export function getRandomSoilSurface(): string {
  const temp = Math.floor(Math.random() * (25 - 16 + 1)) + 16;
  return `${temp}m`;
}

export function getRandomCurrent(): string {
  const current = Math.floor(Math.random() * (50 - 30 + 1)) + 30;
  return `${current}A`;
}

export function getRandomWeightIncomingSoil(): string {
  const weight = Math.floor(Math.random() * (300 - 100 + 1)) + 100;
  return `${weight}kg/h`;
}

export function getRandomOutputSoilWeight(): string {
  const weight = Math.floor(Math.random() * (280 - 80 + 1)) + 80;
  return `${weight}kg/h`;
}

export function getRandomBurnerTemperature(): string {
  const temp = Math.floor(Math.random() * (600 - 300 + 1)) + 300;
  return `${temp}°C`;
}

export function getRandomOutletTemperature(): string {
  const temp = Math.floor(Math.random() * (200 - 100 + 1)) + 100;
  return `${temp}°C`;
}

export function getRandomOutputGranuleWeight(): string {
  const weight = Math.floor(Math.random() * (150 - 50 + 1)) + 50;
  return `${weight}kg/h`;
}

export function getRandomOutputGranuleTemperature(): string {
  const temp = Math.floor(Math.random() * (300 - 100 + 1)) + 100;
  return `${temp}°C`;
}

export function getRandomOutputGranuleMoisture(): string {
  const moisture = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
  return `${moisture}%`;
}

export function getRandomMonopumpCurrent(): string {
  const current = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
  return `${current}A`;
}

export function getRandomMonopumpTemprature(): string {
  const temp = Math.floor(Math.random() * (100 - 40 + 1)) + 40;
  return `${temp}°C`;
}

export function getRandomFlowRate(): string {
  const temp = Math.floor(Math.random() * (100 - 40 + 1)) + 40;
  return `${temp}m³/h`;
}
