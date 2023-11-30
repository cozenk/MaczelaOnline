import { HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function AuthLayout({ children }) {
  return (
    <main className="flex h-[100vh] w-[100vw] items-center justify-center bg-white">
      <div className="flex flex-col items-center justify-center gap-10">
        {children}

        <Link
          href={"/"}
          className="flex items-center gap-4 text-center hover:text-gray-600"
        >
          Back to home <HomeIcon className="w-6" />
        </Link>
      </div>
    </main>
  );
}
