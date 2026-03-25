export interface ItemFootprint {
  item_name: string;
  estimated_co2_kg: number;
  explanation: string;
}

export interface CO2Response {
  overall_co2_kg: number;
  receipt_context: string;
  items_footprint: ItemFootprint[];
  recommendations: string[];
}