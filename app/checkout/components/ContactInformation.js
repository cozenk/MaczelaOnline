"use client";

import Section from "./Section";
import Skeleton from "react-loading-skeleton";
import { useCurrentUser } from "@shared/hooks";

export default function ContactInformation() {
  const { user, isLoading } = useCurrentUser();

  return (
    <Section title="Contact information" titleColor="text-green-700">
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label
            htmlFor="first-name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            First name
          </label>
          {!isLoading ? (
            <input type="hidden" name="user-id" value={user.id} />
          ) : null}
          {!isLoading ? (
            <div className="mt-2">
              <input
                defaultValue={user.first_name}
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          ) : (
            <Skeleton height={35} />
          )}
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="last-name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Last name
          </label>
          {!isLoading ? (
            <div className="mt-2">
              <input
                defaultValue={user.last_name}
                type="text"
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          ) : (
            <Skeleton height={35} />
          )}
        </div>

        <div className="sm:col-span-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address
          </label>

          {!isLoading ? (
            <div className="mt-2">
              <input
                defaultValue={user.email}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          ) : (
            <Skeleton height={35} />
          )}
        </div>

        <div className="sm:col-span-4">
          <label
            htmlFor="mobile-number"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Mobile number
          </label>
          {!isLoading ? (
            <div className="mt-2">
              <input
                defaultValue={""}
                id="mobile-number"
                name="mobile-number"
                type="text"
                autoComplete="mobile-number"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          ) : (
            <Skeleton height={35} />
          )}
        </div>
      </div>
    </Section>
  );
}
