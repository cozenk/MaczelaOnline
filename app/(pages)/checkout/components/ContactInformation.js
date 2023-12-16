import Section from "./Section";
import Skeleton from "react-loading-skeleton";

export default function ContactInformation({ user = null }) {
  return (
    <Section title="Contact information" titleColor="text-green-700">
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label
            htmlFor="first_name"
            className="block text-sm font-medium leading-6 "
          >
            First name
          </label>
          {user ? <input type="hidden" name="user_id" value={user.id} /> : null}
          {user ? (
            <div className="mt-2">
              <input
                defaultValue={user.first_name}
                type="text"
                name="first_name"
                id="first_name"
                autoComplete="given-name"
                required
                className="dark:rign-gray-black block w-full rounded-md border-0  py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          ) : (
            <Skeleton height={35} />
          )}
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="last_name"
            className="block text-sm font-medium leading-6 "
          >
            Last name
          </label>
          {user ? (
            <div className="mt-2">
              <input
                defaultValue={user.last_name}
                type="text"
                name="last_name"
                id="last_name"
                autoComplete="family-name"
                required
                className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          ) : (
            <Skeleton height={35} />
          )}
        </div>

        <div className="sm:col-span-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 "
          >
            Email address
          </label>

          {user ? (
            <div className="mt-2">
              <input
                defaultValue={user.email}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          ) : (
            <Skeleton height={35} />
          )}
        </div>

        <div className="sm:col-span-4">
          <label
            htmlFor="mobile_number"
            className="block text-sm font-medium leading-6 "
          >
            Mobile number
          </label>
          {user ? (
            <div className="mt-2">
              <input
                defaultValue={user.mobile_number}
                min={11}
                max={11}
                id="mobile_number"
                name="mobile_number"
                type="text"
                autoComplete="mobile_number"
                required
                className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
