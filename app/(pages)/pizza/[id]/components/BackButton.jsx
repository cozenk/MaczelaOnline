"use client";

import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const routere = useRouter();

  return (
    <button
      onClick={() => {
        routere.back();
      }}
      className="flex w-full items-center gap-2 pl-40 font-medium hover:text-gray-500"
    >
      <ArrowLeftIcon width={20} /> Go back
    </button>
  );
}
