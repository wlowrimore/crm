"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold">Dashboard Page</h1>
      <p>logged in as {session?.user?.name}</p>
    </div>
  );
}
