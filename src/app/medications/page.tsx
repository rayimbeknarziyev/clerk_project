"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { API_URL } from "@/lib/api";
import { Medication } from "../type";

export default function MedicationsPage() {
  const [meds, setMeds] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getMeds = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch medications");
      const data: Medication[] = await res.json();
      setMeds(data);
    } catch (err: any) {
      setError(err.message || "Unknown error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteMed = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete medication");
      getMeds();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMeds();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div>
      <main className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">All Medications</h1>

        <Link
          href="/add-medication"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add New Medication
        </Link>

        {meds.length === 0 ? (
          <p className="mt-6">No medications yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
            {meds.map((med) => (
              <div key={med.id} className="p-5 shadow-md border rounded-xl">
                <h2 className="text-xl font-semibold">{med.name}</h2>
                <p>Dosage: {med.dosage}</p>
                <p>Times/Day: {med.timesPerDay}</p>
                {med.times && (
                  <p className="mt-2">
                    Reminder Times:{" "}
                    {med.times}
                  </p>
                )}
                <p className="mt-2">
                  Stock:{" "}
                  <span
                    className={
                      med.stock <= 5
                        ? "text-red-600 font-bold"
                        : "text-green-600 font-semibold"
                    }
                  >
                    {med.stock}
                  </span>
                </p>

                <div className="mt-4 flex gap-3">
                  <Link
                    href={`/medications/${med.id}/edit`}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-lg"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteMed(med.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
