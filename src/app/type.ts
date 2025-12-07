// src/type.ts
export type Medication = {
  id: string;
  name: string;
  dosage: string;
  timesPerDay: number;
  stock: number;
  notes?: string;
  times?: string[];
};
