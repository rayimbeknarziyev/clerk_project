"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full shadow-sm bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
        <Link className="text-blue-600 text-2xl font-semibold" href="/">
          MedReminder
        </Link>

        <div className="hidden md:flex items-center gap-6 text-lg">
          <Link href="/">Home</Link>
          <Link href="/medications">Medications</Link>
          <Link href="/add-medication">Add</Link>
          <Link href="/about">About</Link>
          <UserButton />
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          <Menu size={30} />
        </button>
      </div>

      {open && (
        <div className="md:hidden flex flex-col gap-4 p-4 bg-white shadow-lg text-lg">
          <Link href="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link href="/medications" onClick={() => setOpen(false)}>
            Medications
          </Link>
          <Link href="/add-medication" onClick={() => setOpen(false)}>
            Add
          </Link>
          <Link href="/about" onClick={() => setOpen(false)}>
            About
          </Link>

          <UserButton />
        </div>
      )}
    </nav>
  );
}
