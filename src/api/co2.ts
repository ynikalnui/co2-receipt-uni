import type { CO2Response } from '../types/co2';

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN as string;

export async function fetchHealthCheck(): Promise<boolean> {
  const res = await fetch(`${BASE_URL}/healthz`);
  const text = await res.text();
  return text.trim() === 'OK';
}

export async function postReceiptImage(file: File): Promise<CO2Response> {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('accessToken', ACCESS_TOKEN);

  const res = await fetch(`${BASE_URL}/proceed`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`API error ${res.status}: ${errText}`);
  }

  return res.json() as Promise<CO2Response>;
}