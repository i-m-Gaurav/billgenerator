import Image from "next/image";
import Mainpage from "./components/Mainpage";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Mainpage />
    </main>
  );
}
