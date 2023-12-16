"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ disabled = false }) {
  const { pending } = useFormStatus();

  const isDisabled = () => {
    if (disabled) return true;
    if (pending) return true;
    return false;
  };

  return (
    <button
      type="submit"
      disabled={isDisabled()}
      className={`${isDisabled() ? "bg-gray-300" : "bg-green-600"} ${
        isDisabled() ? "hover:bg-gray-300" : "hover:bg-green-700"
      } flex w-full items-center justify-center rounded-md border border-transparent px-6  py-3 text-base font-medium text-white shadow-sm disabled:cursor-not-allowed`}
    >
      {isDisabled() ? "Loading..." : "Save"}
    </button>
  );
}
