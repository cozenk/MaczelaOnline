"use client";

import { Button } from "@shared/Button";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const routere = useRouter();

  return (
    <Button
      variant="ghost"
      onClick={() => {
        routere.back();
      }}
      className="flex w-fit items-center gap-2"
    >
      <ArrowLeftIcon width={20} /> Go back
    </Button>
  );
}
