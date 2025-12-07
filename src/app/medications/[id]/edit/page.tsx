"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";

type Medication = {
  id: string;
  name: string;
  dosage: string;
  timesPerDay: number;
  stock: number;
  times?: string[];
};

export default function EditMedicationPage() {
  const router = useRouter();
  const params = useParams();
  const medId = params?.id;

  const [med, setMed] = useState<Medication | null>(null);
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [timesPerDay, setTimesPerDay] = useState(1);
  const [stock, setStock] = useState(1);

  useEffect(() => {
    if (!medId) return;

    const fetchMed = async () => {
      const res = await fetch(`${API_URL}/${medId}`);
      const data = await res.json();
      setMed(data);
      setName(data.name);
      setDosage(data.dosage);
      setTimesPerDay(data.timesPerDay);
      setStock(data.stock);
    };
    fetchMed();
  }, [medId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!med) return;
    const updatedMed = { ...med, name, dosage, timesPerDay, stock };
    await fetch(`${API_URL}/${medId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedMed),
    });
    router.push("/medications");
  };

  if (!med) return <p>Loading...</p>;

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Medication</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label>Dosage</label>
          <input
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label>Times/Day</label>
          <input
            type="number"
            value={timesPerDay}
            onChange={(e) => setTimesPerDay(Number(e.target.value))}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label>Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            className="w-full border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Save
        </button>
      </form>
    </main>
  );
}
