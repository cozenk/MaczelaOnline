import { Settings2Icon, SettingsIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-y-10">
      <h2 className="flex items-center gap-2 text-4xl">
        This page is under construction <SettingsIcon size={50} />{" "}
      </h2>
      <Link href="/" className="underline hover:text-gray-500">
        Back to Home
      </Link>
    </div>
  );
}
