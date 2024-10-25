"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";
import { extractFirstName } from "../../../lib/utils/nameExtractions";
import AddUserForm from "./DashboardPageComponents/AddUserForm";
import MainDashContainer from "./DashboardPageComponents/MainDashContainer";

type CustomUser = User & {
  role: string;
};

export default function DashboardPage() {
  const { data: session } = useSession();

  if (!session) return null;

  const { firstName } = extractFirstName(session);

  const user = session?.user as CustomUser;
  const role =
    user?.role.slice(0, 1).toUpperCase() +
    user?.role.slice(1, user?.role.length).toLowerCase();

  return (
    <main className="w-full flex flex-col">
      <div className="flex items-center gap-4 border-b border-neutral-700">
        <div className="flex flex-col">
          <h1 className="text-4xl tracking-wider font-semibold">
            {role}&nbsp;<span className="text-neutral-500">Dashboard</span>
          </h1>
          {session && (
            <p className="text-cyan-300 text-sm tracking-wider mb-2">
              Welcome, {firstName}!
            </p>
          )}
        </div>
      </div>
      <section className="flex">
        <AddUserForm role={role} />
        <MainDashContainer />
      </section>
    </main>
  );
}
