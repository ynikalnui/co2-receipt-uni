import { useMutation } from '@tanstack/react-query';
import { postReceiptImage } from '../api/co2';
import { useReceiptStore } from '../store/receiptStore';

export function useCalculateCO2() {
  const setResult = useReceiptStore((s) => s.setResult);

  return useMutation({
    mutationFn: (file: File) => postReceiptImage(file),
    onSuccess: (data) => setResult(data),
  });
}