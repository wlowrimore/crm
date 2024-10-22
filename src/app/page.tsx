import Image from "next/image";
import LandingPage from "./components/LandingPage";

export default function Home() {
  return (
    <main className="container mx-auto p-12 flex flex-col">
      <LandingPage />
    </main>
  );
}
