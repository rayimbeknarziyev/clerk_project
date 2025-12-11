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
      if (!res.ok) throw new Error("Dorilarni olishda xatolik yuz berdi");
      const data: Medication[] = await res.json();
      setMeds(data);
      localStorage.setItem("meds", JSON.stringify(data));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        console.error(err.message);
      } else {
        setError("Noma'lum xatolik yuz berdi");
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("meds");
    if (saved) {
      setMeds(JSON.parse(saved));
      setLoading(false);
    } else {
      getMeds();
    }
  }, []);

  const takeDose = (id: string) => {
    setMeds((prev) => {
      const updated = prev.map((m) => {
        if (m.id === id && (m.takenToday || 0) < m.timesPerDay && m.stock > 0) {
          return {
            ...m,
            takenToday: (m.takenToday || 0) + 1,
            stock: m.stock - 1,
          };
        }
        return m;
      });
      localStorage.setItem("meds", JSON.stringify(updated));
      return updated;
    });
  };

  const deleteMed = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

      if (!res.ok) {
        console.warn(
          "Backend DELETE ishlamadi, faqat localStorage yangilanadi"
        );
      }
    } catch (err) {
      console.warn("DELETE xatolik, ammo local o'chiriladi");
    }

    const updated = meds.filter((m) => m.id !== id);
    setMeds(updated);
    localStorage.setItem("meds", JSON.stringify(updated));
  };
  if (loading) return <p className="p-6">Yuklanmoqda...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <>
      {meds.length === 0 ? (
        <p className="p-6 text-center text-gray-600 text-lg">
          Hozircha dori yo‘q
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {meds.map((med) => (
            <div
              key={med.id}
              className="p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all border border-gray-100 max-w-md mx-auto"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">{med.name}</h2>
                <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-600 font-medium">
                  {med.timesPerDay}× / kun
                </span>
              </div>

              <p className="mt-3 text-gray-700">
                <span className="font-semibold">Doza:</span> {med.dosage}
              </p>

              {med.times && (
                <p className="mt-2 text-gray-700">
                  <span className="font-semibold">Eslatma vaqtlari:</span>{" "}
                  {med.times.join(", ")}
                </p>
              )}

              <p className="mt-3">
                <span className="font-semibold text-gray-800">
                  Qoldiq miqdor:
                </span>{" "}
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

              <div className="mt-4">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-800 font-semibold">
                    Bugungi qabul
                  </span>
                  <span className="text-gray-600">
                    {med.takenToday || 0} / {med.timesPerDay}
                  </span>
                </div>

                <div className="flex gap-2 mt-3">
                  {Array.from({ length: med.timesPerDay }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if ((med.takenToday || 0) < index + 1) takeDose(med.id);
                      }}
                      className={`w-5 h-5 rounded-full border ${
                        index < (med.takenToday || 0)
                          ? "bg-blue-600 border-blue-600"
                          : "bg-white border-gray-400"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-between gap-1">
                <Link
                  href={`/medications/${med.id}/edit`}
                  className="btn px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 font-medium"
                >
                  Tahrirlash
                </Link>

                <button
                  onClick={() => deleteMed(med.id)}
                  className="btn px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 font-medium"
                >
                  O‘chirish
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
