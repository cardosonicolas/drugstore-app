export type DeliveryZone = {
  name: string;
  eta: string;
  cost: number;
  freeFrom?: number;
};

export const deliveryZones: DeliveryZone[] = [
  { name: "Paraná centro", eta: "20-30 min", cost: 1500, freeFrom: 8000 },
  { name: "Paraná barrios", eta: "30-45 min", cost: 2500, freeFrom: 10000 },
  { name: "Oro Verde", eta: "45-60 min", cost: 3500, freeFrom: 12000 },
  { name: "San Benito", eta: "45-60 min", cost: 3500, freeFrom: 12000 },
  { name: "Colonia Avellaneda", eta: "50-70 min", cost: 4000, freeFrom: 14000 },
  { name: "Sauce Montrull", eta: "50-70 min", cost: 4000, freeFrom: 14000 },
];
