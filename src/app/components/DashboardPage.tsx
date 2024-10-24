"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";
import AddUserForm from "./AddUserForm";

type CustomUser = User & {
  role: string;
};

export default function DashboardPage() {
  const { data: session } = useSession();
  const [adminPermissions, setAdminPermissions] = useState<boolean>(false);

  if (!session) return null;

  const user = session?.user as CustomUser;
  const role =
    user?.role.slice(0, 1).toUpperCase() +
    user?.role.slice(1, user?.role.length).toLowerCase();

  return (
    <div className="w-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-4xl tracking-wider font-semibold">Dashboard</h1>
        {session && (
          <p className="text-cyan-300 text-sm tracking-wider">
            {session?.user?.name} is logged in as {role}
          </p>
        )}
      </div>
      <AddUserForm role={role} />
    </div>
  );
}
