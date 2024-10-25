"use client";
0;
import { redirect, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function ServerSideSignOutButton() {
  const router = useRouter();

  const handleSignout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    // <form onSubmit={handleSignout} className="pt-4 pl-4">
    <button
      onClick={handleSignout}
      className="text-xs w-fit rounded-lg py-2 px-1.5 bg-neutral-900 border border-red-800 hover:border-red-950 hover:text-red-50 tracking-widest text-red-400 transition duration-200"
    >
      logout
    </button>
    // </form>
  );
}
