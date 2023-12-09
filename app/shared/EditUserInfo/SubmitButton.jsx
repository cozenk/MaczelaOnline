"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`${pending ? "bg-gray-300" : "bg-green-600"} ${
        pending ? "hover:bg-gray-300" : "hover:bg-green-700"
      } flex w-full items-center justify-center rounded-md border border-transparent px-6  py-3 text-base font-medium text-white shadow-sm disabled:cursor-not-allowed`}
    >
      {pending ? "Loading..." : "Save"}
    </button>
  );
}
