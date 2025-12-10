export interface Medication {
  id: string;
  name: string;
  dosage: string;
  timesPerDay: number;
  times: string[];
  stock: number;
  notes?: string;
  takenToday?: number; 
}