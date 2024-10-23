import { signIn } from "../../../../lib/auth";

export default function SuperUserSignIn() {
  return (
    <main className="flex flex-col items-center justify-center space-y-6">
      <h3 className="text-xl">SuperUser SignIn</h3>
      <form
        action={async (formData) => {
          "use server";
          await signIn("credentials", formData);
        }}
        className="flex flex-col mx-auto gap-6"
      >
        <label className="flex flex-col">
          Email
          <input type="email" name="email" />
        </label>
        <label className="flex flex-col">
          Password
          <input type="password" name="password" />
        </label>
        <button>SignIn as SuperUser</button>
      </form>
    </main>
  );
}
