export default function AboutPage() {
  return (
    <div>
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">About MedReminder</h1>

        <div className="bg-white p-6 shadow-md rounded-xl border space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-2">MedReminder nima?</h2>
            <p className="text-gray-700 leading-relaxed">
              MedReminder — bu dorilarni o‘z vaqtida ichishni eslatib turadigan
              shaxsiy sog‘liq asistenti. Foydalanuvchi har kuni ichishi kerak
              bo‘lgan dorilarni kiritadi va tizim ularga eslatma chiqarib
              boradi.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              Bu saytning foydalari
            </h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-1">
              <li>Kunlik dori eslatmalari</li>
              <li>“Ichdim” tugmasi bilan progress kuzatish</li>
              <li>Barcha dorilarni umumiy ko‘rish</li>
              <li>Dinamika bilan vaqt qo‘shish imkoniyati</li>
              <li>Dorilar sonini (stock) kuzatish</li>
              <li>Foydalanuvchi hisoblari – Clerk Authentication</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              Sizning malumotlaringiz qanday saqlanadi
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Tizim foydalanuvchi maʼlumotlarini xavfsiz saqlash uchun zamonaviy
              autentifikatsiya va maʼlumotlar bazasi texnologiyalaridan
              foydalanadi. Hamma kirilgan dorilar faqat shaxsiy profilga
              tegishli bo‘ladi va hech kim tomonidan ko‘rilmaydi.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Dasturchi</h2>
            <p className="text-gray-700 leading-relaxed">
              Ushbu loyiha
              <span className="font-semibold">Rayimbek Narziyev</span>
              tomonidan Next.js, TypeScript va Clerk asosida ishlab chiqilgan.
              Maqsad — foydalanuvchilarga kundalik sog‘liq faoliyatini qulayroq
              boshqarishga yordam berish.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
