import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Sprout } from 'lucide-react';
import { ApiStatusBadge } from './components/main/ApiStatusBadge';
import { UploadZone } from './components/main/UploadZone';
import { ResultsPanel } from './components/main/ResultsPanel';
import { useReceiptStore } from './store/receiptStore';

const queryClient = new QueryClient();

function AppInner() {
  const result = useReceiptStore((s) => s.result);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand/5 via-white to-brand/5 flex flex-col items-center px-4 py-12 gap-10">
      <header className="flex flex-col items-center gap-3 text-center">
        <div className="w-16 h-16 rounded-3xl bg-brand flex items-center justify-center text-white shadow-lg shadow-brand/30">
          <Sprout size={32} />
        </div>
        <h1 className="font-display text-4xl font-bold text-gray-900 tracking-tight">
          Receipt CO₂
        </h1>
        <p className="text-sm text-gray-400 max-w-xs">
          Upload a grocery receipt and discover its carbon footprint instantly.
        </p>
        <ApiStatusBadge />
      </header>

      <main className="w-full flex flex-col items-center gap-8">
        {!result ? <UploadZone /> : <ResultsPanel />}
      </main>

      <footer className="text-xs text-brand/40 mt-auto">
        Powered by Nabi AI · CO₂ estimates are approximate
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppInner />
    </QueryClientProvider>
  );
}