"use client";

import { priceRegex } from "@utils/regex";
import { useState } from "react";

export default function PriceInput({
  className = "",
  name = "price",
  id = "price",
  required = false,
  value = null,
  onChange = null,
}) {
  const [input, setInput] = useState("");

  return (
    <input
      type="text"
      value={value !== null ? value : input}
      onChange={(e) => {
        if (onChange !== null) {
          onChange(e);
        } else {
          if (priceRegex.test(e.target.value)) setInput(e.target.value);
        }
      }}
      name={name}
      id={id}
      required={required}
      className={className}
    />
  );
}
