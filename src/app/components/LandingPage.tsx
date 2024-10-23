import { auth } from "../../../lib/auth";
import LandingTitle from "./LandingPageComponents/LandingTitle";
import EmployeeSignin from "./SignInComponents/EmployeeSignin";
// import SuperUserSignIn from "./SignInComponents/SuperUserSignIn";

export default async function LandingPage() {
  const session = await auth();
  console.log("Session:", session);

  return (
    <div className="constainer w-full mx-auto min-h-screen flex flex-col items-center justify-center">
      <LandingTitle />
      <section className="w-full flex flex-col mx-auto my-20">
        <EmployeeSignin />
        {/* <SuperUserSignIn /> */}
      </section>
    </div>
  );
}
