import { create } from 'zustand';
import type { CO2Response } from '../types/co2';

interface ReceiptState {
  file: File | null;
  result: CO2Response | null;
  setFile: (file: File | null) => void;
  setResult: (result: CO2Response | null) => void;
  reset: () => void;
}

export const useReceiptStore = create<ReceiptState>((set) => ({
  file: null,
  result: null,
  setFile: (file) => set({ file, result: null }),
  setResult: (result) => set({ result }),
  reset: () => set({ file: null, result: null }),
}));