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

export default function AddUserForm() {
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
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-2/6 mx-auto p-32">
      <div className="w-full flex justify-center">
        <h1 className="text-4xl">Add New User</h1>
      </div>
      <div className="mt-6">
        <label htmlFor="name">Full Name</label>
        <input
          type="name"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-2 py-1 rounded outline-none text-lg text-black bg-sky-100"
          required
        />
      </div>
      <div className="mt-6">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-2 py-1 rounded outline-none text-lg text-black bg-sky-100"
          required
        />
      </div>
      <div className="mt-6">
        <label htmlFor="phone">Mobile Phone</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-2 py-1 rounded outline-none text-lg text-black bg-sky-100"
          required
        />
      </div>

      <div className="mt-6">
        <label htmlFor="role">Role</label>
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
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-2 py-1 rounded outline-none text-lg text-black bg-sky-100"
          required
        />
      </div>
      <div className="mt-6">
        <label htmlFor="reEnteredPassword">Re-Enter Password</label>
        <input
          type="password"
          id="reEnteredPassword"
          name="reEnteredPassword"
          value={formData.reEnteredPassword}
          onChange={handleChange}
          className="w-full px-2 py-1 rounded outline-none text-lg text-black bg-sky-100"
          required
        />
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="mt-12 flex items-center justify-center">
        <button
          type="submit"
          disabled={loading}
          className="disabled:bg-neutral-300 hover:bg-blue-600 hover:text-white transition duration-200 w-full px-4 py-1 bg-sky-300 rounded text-2xl text-neutral-800 font-bold outline-black"
        >
          {loading ? "Adding User..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
