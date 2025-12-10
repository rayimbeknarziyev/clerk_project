export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto mt-24 text-center px-4">
      <h1 className="text-4xl font-bold mb-6">
        Welcome to <span className="text-blue-600">MedReminder</span>
      </h1>

      <p className="text-lg text-gray-700 leading-relaxed">
        MedReminder — bu dorilarni o‘z vaqtida ichishni eslatib turadigan qulay
        va sodda sog‘liq ilovasi. Har kuni ichilishi kerak bo‘lgan dorilarni
        kiritasiz, tizim esa ularni tartiblab beradi va eslatib boradi.
      </p>
    </div>
  );
}
