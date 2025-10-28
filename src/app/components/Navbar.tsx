import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-8 text-xl">
      <Link href={"/"}>Home</Link>
      <Link href={"/dashboard"}>Dashboard</Link>
      <Link href={"/about"}>About</Link>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <Link href={"/sign-in"}>Sign In</Link>
      </SignedOut>
    </nav>
  );
}
