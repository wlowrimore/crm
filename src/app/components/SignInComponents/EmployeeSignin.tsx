"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import ServerSideSignOutButton from "../ui/ClientSideSignOutButton";

export default function EmployeeSignin() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signIn("credentials", {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
      callbackUrl: "/dashboard",
    });
    router.push("/dashboard");
  };
  return (
    <main className="w-full">
      <form
        onSubmit={handleSubmit}
        method="post"
        className="max-w-[92%] md:max-w-[40%] lg:max-w-[25%] flex flex-col mx-auto gap-5"
      >
        <h3 className="text-2xl mb-6 text-neutral-300 text-center">
          Employee Portal
        </h3>
        <label className="flex flex-col">
          <input
            type="email"
            name="email"
            placeholder="Company Email"
            className="p-1 text-white bg-transparent border-b border-neutral-500 placeholder:font-[300] placeholder:text-neutral-500 focus:outline-none"
          />
        </label>
        <label className="flex flex-col">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-1 text-white bg-transparent border-b border-neutral-500 placeholder:font-[300] placeholder:text-neutral-500 focus:outline-none"
          />
        </label>
        <button className="mt-4 py-1 bg-cyan-300/80 rounded-md w-full hover:bg-sky-300 transition duration-200 text-lg font-[800] text-neutral-800 focus:outline-none">
          Validate
        </button>
      </form>
    </main>
  );
}
