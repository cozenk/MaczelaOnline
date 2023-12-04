"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

export default function ActionButtons({ className = "" }) {
  const { isSignedIn } = useAuth();

  return (
    <div className={`mt-10 flex items-center gap-x-10 ${className}`}>
      <a
        href="#menu"
        className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
      >
        See the menu
      </a>
      {!isSignedIn ? (
        <Link
          href="/login"
          className="text-sm font-semibold leading-6  dark:text-white"
        >
          Login to save orders <span aria-hidden="true">→</span>
        </Link>
      ) : null}
    </div>
  );
}
