"use client";

import { useState } from "react";
import { API_URL } from "@/lib/api";
import { Medication } from "../type";

export default function AddMedicationPage() {
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [timesPerDay, setTimesPerDay] = useState(1);
  const [times, setTimes] = useState<string[]>([""]);
  const [stock, setStock] = useState(1);
  const [notes, setNotes] = useState("");

  const addTime = () => setTimes([...times, ""]);
  const updateTime = (index: number, value: string) => {
    const copy = [...times];
    copy[index] = value;
    setTimes(copy);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newMed: Medication = {
      id: Date.now().toString(),
      name,
      dosage,
      timesPerDay,
      stock,
      notes,
      times,
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMed),
      });
      if (!res.ok) throw new Error("Failed to add medication");
      alert("Medication added!");
      setName("");
      setDosage("");
      setTimesPerDay(1);
      setTimes([""]);
      setStock(1);
      setNotes("");
    } catch (err) {
      console.error(err);
      alert("Error adding medication");
    }
  };

  return (
    <div>
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Add New Medication</h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-5 bg-white p-6 shadow-md rounded-xl border"
        >
          <div>
            <label className="block font-medium mb-1">Medication Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-4 rounded-lg"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Dosage</label>
            <input
              type="text"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              className="w-full border p-4 rounded-lg"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Times Per Day</label>
            <input
              type="number"
              min={1}
              value={timesPerDay}
              onChange={(e) => setTimesPerDay(Number(e.target.value))}
              className="w-full border p-4 rounded-lg"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Reminder Times</label>
            {times.map((time, i) => (
              <input
                key={i}
                type="time"
                value={time}
                onChange={(e) => updateTime(i, e.target.value)}
                className="w-full border p-4 rounded-lg mb-2"
              />
            ))}
            <button
              type="button"
              onClick={addTime}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              + Add Time
            </button>
          </div>

          <div>
            <label className="block font-medium mb-1">Stock (tablets)</label>
            <input
              type="number"
              min={1}
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              className="w-full border p-4 rounded-lg"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Notes (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border p-4 rounded-lg"
              rows={4}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-green-700"
          >
            Save Medication
          </button>
        </form>
      </main>
    </div>
  );
}
