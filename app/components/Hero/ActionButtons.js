"use client";

import { useAuth } from "@clerk/nextjs";
import { Button } from "@shared/Button";
import Link from "next/link";

export default function ActionButtons({ className = "" }) {
  const { isSignedIn } = useAuth();

  return (
    <div className={`mt-10 flex items-center gap-x-10 ${className}`}>
      {/* <Button variant="success">
        <a href="#menu">See the menu</a>
      </Button> */}

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
