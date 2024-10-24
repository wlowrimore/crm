"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SiteLogo from "../../../public/logos/siteLogo.webp";

interface FormData {
  name: string;
  email: string;
  phone: string;
  role: string;
  password: string;
  reEnteredPassword: string;
}

export default function AddUserForm({ role }: { role: string }) {
  console.log("AddUserForm", { role });
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    role: "",
    password: "",
    reEnteredPassword: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (formData.password !== formData.reEnteredPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    console.log(formData);

    try {
      const signupResponse = await fetch("/api/auth/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
          password: formData.password,
        }),
      });

      const signupData = await signupResponse.json();

      if (!signupResponse.ok) {
        throw new Error(signupData.error || "Failed to sign up");
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const signInResult = await signIn("credentials", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        password: formData.password,
        redirect: false,
      });

      console.log("SignIn result:", signInResult);

      if (signInResult?.error) {
        setError(signInResult.error);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (role !== "Admin") {
    return null;
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col max-w-[92%] md:max-w-[40%] lg:max-w-[25%]"
    >
      <div className="w-full flex justify-center px-6 py-3 bg-gradient-to-b from-blue-800 via-blue-950 to-transparent border-t-4 border-blue-950">
        <h1 className="text-3xl">Add New User</h1>
      </div>
      <div className="mt-12">
        <input
          type="name"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="p-1 w-full text-white bg-transparent border-b border-neutral-500 placeholder:font-[300] placeholder:text-neutral-500 focus:outline-none"
          required
        />
      </div>
      <div className="mt-6">
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Company Email"
          className="p-1 w-full text-white bg-transparent border-b border-neutral-500 placeholder:font-[300] placeholder:text-neutral-500 focus:outline-none"
          required
        />
      </div>
      <div className="mt-6">
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Office Phone"
          className="p-1 w-full text-white bg-transparent border-b border-neutral-500 placeholder:font-[300] placeholder:text-neutral-500 focus:outline-none"
          required
        />
      </div>

      <div className="mt-6">
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleSelect}
          className="w-full px-2 py-1 rounded outline-none text-lg text-black bg-sky-100"
        >
          <option value="">Select Role</option>
          <option value="ADMIN">Admin</option>
          <option value="USER">User</option>
        </select>
      </div>

      <div className="mt-6">
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="p-1 w-full text-white bg-transparent border-b border-neutral-500 placeholder:font-[300] placeholder:text-neutral-500 focus:outline-none"
          required
        />
      </div>
      <div className="mt-6">
        <input
          type="password"
          id="reEnteredPassword"
          name="reEnteredPassword"
          value={formData.reEnteredPassword}
          onChange={handleChange}
          placeholder="Re-Enter Password"
          className="p-1 w-full text-white bg-transparent border-b border-neutral-500 placeholder:font-[300] placeholder:text-neutral-500 focus:outline-none"
          required
        />
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="mt-6 flex items-center justify-center">
        <button
          type="submit"
          disabled={loading}
          className="disabled:bg-neutral-300 hover:bg-blue-600 text-white transition duration-200 w-full px-4 py-1 bg-blue-800 rounded text-2xl outline-black"
        >
          {loading ? "Adding User..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
