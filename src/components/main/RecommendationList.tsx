import { CheckCircle2 } from 'lucide-react';

interface RecommendationListProps {
  items: string[];
}

export function RecommendationList({ items }: RecommendationListProps) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((rec, i) => (
        <li key={i} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
          <CheckCircle2 size={17} className="mt-0.5 flex-shrink-0 text-brand" />
          {rec}
        </li>
      ))}
    </ul>
  );
}