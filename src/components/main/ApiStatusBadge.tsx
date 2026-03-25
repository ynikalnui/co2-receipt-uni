import { Wifi, WifiOff, Loader2 } from 'lucide-react';
import { useHealthCheck } from '../../hooks/useHealthCheck';
import { Badge } from '../ui/Badge';

export function ApiStatusBadge() {
  const { data: isOk, isLoading, isError } = useHealthCheck();

  if (isLoading) {
    return (
      <Badge variant="gray">
        <Loader2 size={11} className="animate-spin" /> Checking API…
      </Badge>
    );
  }
  if (isError || !isOk) {
    return (
      <Badge variant="red">
        <WifiOff size={11} /> API Offline
      </Badge>
    );
  }
  return (
    <Badge variant="green">
      <Wifi size={11} /> API Online
    </Badge>
  );
}