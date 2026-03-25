import { Wind, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useReceiptStore } from '../../store/receiptStore';
import { useCalculateCO2 } from '../../hooks/useCalculateCO2';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ItemRow } from './ItemRow';
import { RecommendationList } from './RecommendationList';

export function ResultsPanel() {
  const { result, reset } = useReceiptStore();
  const { reset: resetMutation } = useCalculateCO2();

  if (!result) return null;

  const max = Math.max(...result.items_footprint.map((i) => i.estimated_co2_kg));

  const handleReset = () => {
    reset();
    resetMutation();
  };

  return (
    <div className="w-full max-w-xl flex flex-col gap-5 animate-fade-in">
      <Card className="text-center">
        <div className="w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center text-brand mx-auto mb-3">
          <Wind size={24} />
        </div>
        <p className="text-xs uppercase tracking-widest text-brand font-semibold mb-1">
          Total Carbon Footprint
        </p>
        <p className="font-display text-5xl font-bold text-gray-900">
          {result.overall_co2_kg.toFixed(2)}
          <span className="text-2xl text-gray-400 ml-1">kg CO₂</span>
        </p>
        <p className="mt-2 text-sm text-gray-400">{result.receipt_context}</p>
      </Card>

      <Card>
        <h2 className="font-display font-semibold text-gray-800 mb-4 text-lg">
          Item Breakdown
        </h2>
        <div className="flex flex-col gap-5">
          {result.items_footprint.map((item) => (
            <ItemRow key={item.item_name} item={item} max={max} />
          ))}
        </div>
      </Card>

      {result.recommendations.length > 0 && (
        <Card>
          <h2 className="font-display font-semibold text-gray-800 mb-4 text-lg flex items-center gap-2">
            <span className="text-brand"><CheckCircle2 size={20} /></span>
            Recommendations
          </h2>
          <RecommendationList items={result.recommendations} />
        </Card>
      )}

      <div className="flex justify-center">
        <Button variant="outline" onClick={handleReset}>
          <ArrowLeft size={15} /> Scan another receipt
        </Button>
      </div>
    </div>
  );
}