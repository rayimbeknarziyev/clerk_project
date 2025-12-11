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
  takenToday?: number;
  times?: string[];
};

export default function EditMedicationPage() {
  const router = useRouter();
  const params = useParams();

  const medId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [med, setMed] = useState<Medication | null>(null);
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [timesPerDay, setTimesPerDay] = useState(1);
  const [stock, setStock] = useState(1);

  useEffect(() => {
    if (!medId) return;

    const loadMed = async () => {
      try {
        const res = await fetch(`${API_URL}/${medId}`);

        if (!res.ok) {
          console.warn("Backend topa olmadi, localStorage dan olinadi");

          const saved = localStorage.getItem("meds");
          if (saved) {
            const list: Medication[] = JSON.parse(saved);
            const localMed = list.find((m) => m.id === medId);

            if (localMed) {
              setMed(localMed);
              setName(localMed.name);
              setDosage(localMed.dosage);
              setTimesPerDay(localMed.timesPerDay);
              setStock(localMed.stock);
            }
          }
          return;
        }

        const data = await res.json();
        setMed(data);

        setName(data.name);
        setDosage(data.dosage);
        setTimesPerDay(data.timesPerDay);
        setStock(data.stock);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    loadMed();
  }, [medId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!med || !medId) return;

    const updatedMed: Medication = {
      ...med,
      name,
      dosage,
      timesPerDay,
      stock,
    };

    try {
      const res = await fetch(`${API_URL}/${medId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedMed),
      });

      if (!res.ok) {
        console.warn("PUT ishlamadi, localStorage yangilanadi");
      }
    } catch (err) {
      console.warn("PUT xatolik, lekin local yangilanadi");
    }

    const saved = localStorage.getItem("meds");
    if (saved) {
      const list = JSON.parse(saved).map((item: Medication) =>
        item.id === medId ? updatedMed : item
      );
      localStorage.setItem("meds", JSON.stringify(list));
    }

    router.push("/medications");
  };

  if (!med) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Medication</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="font-medium">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="font-medium">Dosage</label>
          <input
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="font-medium">Times Per Day</label>
          <input
            type="number"
            value={timesPerDay}
            onChange={(e) => setTimesPerDay(Number(e.target.value))}
            className="w-full border p-2 rounded"
            min={1}
            required
          />
        </div>

        <div>
          <label className="font-medium">Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            className="w-full border p-2 rounded"
            min={1}
            required
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
