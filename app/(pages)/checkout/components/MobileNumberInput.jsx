"use client";

import { mobileNumberRegex } from "@utils/regex";
import React, { useState } from "react";

export default function MobileNumberInput({ initialValue = "" }) {
  const [mobile_number, setMobileNumber] = useState(initialValue || "09");

  return (
    <div className="mt-2">
      <input
        value={mobile_number}
        onChange={(e) => {
          if (mobileNumberRegex.test(e.target.value)) {
            setMobileNumber(e.target.value.slice(0, 11));
          }
        }}
        id="mobile_number"
        name="mobile_number"
        type="text"
        required
        className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
  );
}
