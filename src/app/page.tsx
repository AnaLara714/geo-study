'use client'
import MapClient from "@/components/map/MapClient";
import { LoginForm } from "@/components/ui/Login-Form";

export default function Home() {

  return (
    <div className=" h-screen w-full flex flex-col flex-1 items-center justify-center font-sans dark:bg-black">
      <main className="flex flex-1 w-full h-screen flex-col items-center justify-center bg-white dark:bg-black">
        {/* <LoginForm /> */}
        <MapClient />
      </main>
    </div>
  );
}

