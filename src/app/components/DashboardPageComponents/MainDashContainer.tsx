"use client";

import { useSession } from "next-auth/react";
import { extractInitials } from "../../../../lib/utils/nameExtractions";
import ClientSideSignOutButton from "../ui/ClientSideSignOutButton";

export default function MainDashContainer() {
  const { data: session } = useSession();

  if (!session) return null;

  const initials = extractInitials(session);

  return (
    <main className="w-full">
      <div className="w-full flex justify-end py-2 gap-4">
        <h1 className="text-xs w-fit rounded-lg py-2 px-1.5 border border-gray-500 tracking-widest text-blue-100 bg-cyan-950">
          {initials}
        </h1>
        <ClientSideSignOutButton />
      </div>
    </main>
  );
}
