"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import Section from "./Section";

export default function BillingAddress() {
  const { user } = useUser();
  const [sameAsContact, setSameAsContact] = useState(true);

  return (
    <Section title="Billing address" titleColor="text-green-700">
      <div className="mb-10 flex items-center gap-2 sm:col-span-3">
        <input
          checked={sameAsContact}
          onChange={(e) => setSameAsContact(e.target.checked)}
          id="billing-same-as-contact"
          name="billing-same-as-contact"
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
        <label
          htmlFor="billing-same-as-contact"
          className="block text-sm font-medium leading-6 "
        >
          Same as shipping address
        </label>
      </div>

      {!sameAsContact ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full">
            <label
              htmlFor="complete_address"
              className="block text-sm font-medium leading-6 "
            >
              Complete address
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="complete_address"
                id="complete_address"
                autoComplete="complete_address"
                className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2 sm:col-start-1">
            <label
              htmlFor="city"
              className="block text-sm font-medium leading-6 "
            >
              City
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="city"
                id="city"
                autoComplete="address-level2"
                className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="region"
              className="block text-sm font-medium leading-6 "
            >
              Province
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="region"
                id="region"
                autoComplete="address-level1"
                className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="postal-code"
              className="block text-sm font-medium leading-6 "
            >
              ZIP / Postal code
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="postal-code"
                id="postal-code"
                autoComplete="postal-code"
                className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      ) : null}
    </Section>
  );
}
