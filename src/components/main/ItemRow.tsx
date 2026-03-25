import { Leaf, AlertTriangle, Flame } from 'lucide-react';
import type { ItemFootprint } from '../../types/co2';

interface ItemRowProps {
  item: ItemFootprint;
  max: number;
}

type Level = 'low' | 'medium' | 'high';

function getLevel(kg: number): Level {
  if (kg < 0.5) return 'low';
  if (kg < 2) return 'medium';
  return 'high';
}

const levelConfig: Record<Level, { bar: string; icon: React.ReactNode; label: string }> = {
  low:    { bar: 'bg-brand',      icon: <Leaf size={13} />,          label: 'text-brand' },
  medium: { bar: 'bg-amber-400',  icon: <AlertTriangle size={13} />, label: 'text-amber-500' },
  high:   { bar: 'bg-red-400',    icon: <Flame size={13} />,         label: 'text-red-500' },
};

export function ItemRow({ item, max }: ItemRowProps) {
  const pct = Math.round((item.estimated_co2_kg / max) * 100);
  const level = getLevel(item.estimated_co2_kg);
  const { bar, icon, label } = levelConfig[level];

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-gray-800 capitalize flex items-center gap-1.5">
          <span className={label}>{icon}</span>
          {item.item_name}
        </span>
        <span className="text-xs font-bold text-gray-500">
          {item.estimated_co2_kg.toFixed(2)} kg CO₂
        </span>
      </div>
      <div className="h-2 bg-brand/10 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${bar}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-gray-400">{item.explanation}</p>
    </div>
  );
}