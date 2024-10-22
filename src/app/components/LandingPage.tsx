import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-4xl tracking-wider font-semibold text-center uppercase">
        GENERIC CRM
      </h1>
      <div className="w-full text-center mt-12">
        <Link
          href="/add-user"
          className="bg-blue-700 text-white text-xl font-semibold tracking-wide border px-4 py-1 rounded hover:bg-opacity-50 transition duration-200"
        >
          Add User
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
