"use client";

export default function HomePage() {
  const reminders = [
    { id: 1, name: "Paracetamol", time: "08:00", taken: false },
    { id: 2, name: "Vitamin D", time: "13:00", taken: true },
    { id: 3, name: "Ibuprofen", time: "20:00", taken: false },
  ];

  const nextReminder = reminders.find((r) => !r.taken);
  const progress =
    (reminders.filter((r) => r.taken).length / reminders.length) * 100;

  return (
    <div>
      <main className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Today Reminders</h1>

        <div className="mb-6">
          <p className="text-lg font-medium mb-2">Today’s Progress:</p>
          <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
            <div
              className="bg-green-500 h-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="mt-2 text-gray-700">{progress.toFixed(0)}% completed</p>
        </div>

        {nextReminder && (
          <div className="p-4 mb-6 bg-blue-50 border border-blue-200 rounded-xl">
            <h2 className="text-xl font-semibold">Next Reminder</h2>
            <p className="text-gray-700 mt-2">
              {nextReminder.name} — <span>{nextReminder.time}</span>
            </p>
          </div>
        )}

        <div className="mt-4 space-y-4">
          {reminders.map((rem) => (
            <div
              key={rem.id}
              className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white shadow rounded-xl"
            >
              <div>
                <h3 className="text-xl font-semibold">{rem.name}</h3>
                <p className="text-gray-500">Time: {rem.time}</p>
              </div>
              <button
                className={`mt-3 md:mt-0 px-5 py-2 rounded-lg text-white font-medium ${
                  rem.taken ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
                }`}
                disabled={rem.taken}
              >
                {rem.taken ? "Taken ✔" : "Mark as Taken"}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
