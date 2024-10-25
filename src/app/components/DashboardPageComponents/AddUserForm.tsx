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
      className="flex flex-col max-w-[92%] md:max-w-[40%] lg:max-w-[25%] border-r border-neutral-700 pt-2 pr-2"
    >
      <div className=" bg-gradient-to-t from-neutral-950 to-cyan-950 p-6">
        <div className="w-full flex text-white">
          <h1 className="text-xl font-light">Register a new employee here</h1>
        </div>
        <div className="mt-6">
          <label className="text-neutral-300">Full Name</label>
          <input
            type="name"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="p-1 w-full text-black bg-white border border-neutral-500 focus:outline-none"
            required
          />
        </div>
        <div className="mt-6">
          <label className="text-neutral-300">Company Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="p-1 w-full text-black bg-white border border-neutral-500 focus:outline-none"
            required
          />
        </div>
        <div className="mt-6">
          <label className="text-neutral-300">Office Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="p-1 w-full text-black bg-white border border-neutral-500 focus:outline-none"
            required
          />
        </div>

        <div className="mt-6">
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleSelect}
            className="w-full outline-none text-lg text-white p-1 bg-gray-800 border border-neutral-500"
          >
            <option value="">Select Role</option>
            <option value="ADMIN">Admin</option>
            <option value="MANAGER">Manager</option>
            <option value="USER">User</option>
          </select>
        </div>

        <div className="mt-6">
          <label className="text-neutral-300">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="p-1 w-full text-black bg-white border border-neutral-500 focus:outline-none"
            required
          />
        </div>
        <div className="mt-6">
          <label className="text-neutral-300">Re-Enter Password</label>
          <input
            type="password"
            id="reEnteredPassword"
            name="reEnteredPassword"
            value={formData.reEnteredPassword}
            onChange={handleChange}
            className="p-1 w-full text-black bg-blue-200 border border-neutral-500 focus:outline-none"
            required
          />
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <div className="mt-6 flex items-center justify-center">
          <button
            type="submit"
            disabled={loading}
            className="disabled:bg-neutral-300 bg-neutral-900 border border-neutral-800 hover:bg-neutral-950 text-white transition duration-200 w-full text-center py-1 px-4 text-xl outline-black"
          >
            {loading ? "Adding User to Database..." : "Register"}
          </button>
        </div>
      </div>
    </form>
  );
}
