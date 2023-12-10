"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

export default function Modal({
  show = null,
  onClose = () => {},
  children,
  className = "",
}) {
  useEffect(() => {
    if (show) {
      const handler = (e) => {
        if (
          !e.target.closest(".overlay-content") &&
          !e.target.closest(".modal-trigger")
        ) {
          onClose();
        }
      };
      document.addEventListener("click", handler);

      return () => {
        document.removeEventListener("click", handler);
      };
    }
  }, [show, onClose]);

  if (show === false) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 h-screen bg-gray-500 bg-opacity-75 transition-opacity ${className}`}
    >
      <div className="overlay-content absolute left-1/2 top-1/2 flex max-h-[40rem] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-between overflow-y-auto rounded-xl  bg-white p-14 dark:bg-black">
        <XMarkIcon
          onClick={onClose}
          className="absolute right-4 top-4 cursor-pointer hover:text-gray-500"
          width={30}
        />

        {children}
      </div>
    </div>
  );
}
