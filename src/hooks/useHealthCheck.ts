import { useQuery } from '@tanstack/react-query';
import { fetchHealthCheck } from '../api/co2';

export function useHealthCheck() {
  return useQuery({
    queryKey: ['health'],
    queryFn: fetchHealthCheck,
    refetchInterval: 30_000,
    staleTime: 15_000,
  });
}