import { currentUser } from "@clerk/nextjs/server";

export default async function page() {
  const user = await currentUser();
  return <div className="text-3xl text-center">Welcome, {user?.fullName}</div>;
}
