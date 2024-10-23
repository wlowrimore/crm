import { signIn } from "../../../../lib/auth";
import ServerSideSignOutButton from "../ui/ServerSideSignOutButton";

export default function EmployeeSignin() {
  return (
    <main className="w-full flex flex-col items-center justify-center space-y-6">
      <form
        action={async (formData) => {
          "use server";
          await signIn("credentials", formData, { redirectTo: "/dashboard" });
        }}
        className="w-3/12 p-8 flex flex-col mx-auto gap-6 border border-neutral-400"
      >
        <h3 className="text-xl text-neutral-300 text-center">
          SignIn as Employee
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
        <div className="bg-blue-300 text-center p-2 my-2">
          <button className="bg-white rounded-md w-full hover:bg-blue-300 transition duration-200 text-lg font-[700] text-neutral-800 focus:outline-none">
            Submit
          </button>
        </div>
      </form>
      <ServerSideSignOutButton />
    </main>
  );
}
