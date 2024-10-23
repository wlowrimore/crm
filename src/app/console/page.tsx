import Link from "next/link";

export default function Console() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <Link
        href="/add-user"
        className="bg-blue-700 text-white text-xl font-semibold tracking-wide border px-4 py-1 rounded hover:bg-opacity-50 transition duration-200"
      >
        Add User
      </Link>
    </div>
  );
}
