"use client";

import { Bars3Icon } from "@heroicons/react/24/outline";
import { NavContext } from "@providers/NavProvider";
import React, { useContext } from "react";

export default function Bars() {
  const { openMobileMenu } = useContext(NavContext);

  return (
    <div className="flex md:hidden">
      <button
        type="button"
        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
        onClick={openMobileMenu}
      >
        <span className="sr-only">Open main menu</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  );
}
