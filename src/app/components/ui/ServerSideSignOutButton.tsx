import { signOut } from "../../../../lib/auth";

export default function ServerSideSignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button className="text-red-400 hover:text-red-700 transition duration-200">
        Signout
      </button>
    </form>
  );
}