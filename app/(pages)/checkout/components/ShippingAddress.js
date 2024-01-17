import Section from "./Section";
import Skeleton from "react-loading-skeleton";

export default function ShippingAddress({ user = null }) {
  return (
    <Section title="Shipping address" titleColor="text-green-700">
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="col-span-full">
          <label
            htmlFor="complete_address"
            className="block text-sm font-medium leading-6 "
          >
            Complete address
          </label>
          <div className="mt-2">
            {user ? (
              <input
                required
                defaultValue={user.complete_address}
                type="text"
                name="complete_address"
                id="complete_address"
                autoComplete="complete_address"
                className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            ) : (
              <Skeleton height={35} />
            )}
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
            {user ? (
              <input
                disabled
                required
                defaultValue={"Marikina"}
                type="text"
                name="city"
                id="city"
                autoComplete="city"
                className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:opacity-50 sm:text-sm sm:leading-6"
              />
            ) : (
              <Skeleton height={35} />
            )}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="province"
            className="block text-sm font-medium leading-6 "
          >
            Province
          </label>
          <div className="mt-2">
            {user ? (
              <input
                disabled
                required
                defaultValue={"Rizal"}
                type="text"
                name="province"
                id="province"
                autoComplete="province"
                className="block w-full rounded-md border-0 py-1.5 shadow-sm  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:opacity-50 sm:text-sm sm:leading-6"
              />
            ) : (
              <Skeleton height={35} />
            )}
          </div>
        </div>

        {/* <div className="sm:col-span-2">
          <label
            htmlFor="postal_code"
            className="block text-sm font-medium leading-6 "
          >
            ZIP / Postal code
          </label>
          <div className="mt-2">
            {user ? (
              <input
                disabled
                required
                defaultValue={"1800"}
                type="text"
                name="postal_code"
                id="postal_code"
                autoComplete="postal_code"
                className="block w-full rounded-md border-0 py-1.5 shadow-sm  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:opacity-50 sm:text-sm sm:leading-6"
              />
            ) : (
              <Skeleton height={35} />
            )}
          </div>
        </div> */}
      </div>
    </Section>
  );
}
