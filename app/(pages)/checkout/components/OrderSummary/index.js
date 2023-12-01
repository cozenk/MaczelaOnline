import CartItems from "@shared/Cart/CartItems";
import Section from "../Section";
import Total from "./Total";
import Link from "next/link";
import { useFormStatus } from "react-dom";

export default function OrderSummary() {
  const { pending } = useFormStatus();

  return (
    <Section title="Order summary" titleColor="text-green-700">
      <CartItems />
      <Total />
      <div className="mt-6">
        <button
          type="submit"
          className={`${pending ? "bg-gray-300" : "bg-green-600"} ${
            pending ? "hover:bg-gray-300" : "hover:bg-green-700"
          } flex w-full items-center justify-center rounded-md border border-transparent  px-6 py-3 text-base font-medium text-white shadow-sm`}
        >
          {pending ? "Loading..." : "Confirm order"}
        </button>
      </div>
      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
        <p>
          <Link
            href={"/"}
            className="font-medium text-black hover:text-gray-500"
          >
            Go back
          </Link>
        </p>
      </div>
    </Section>
  );
}
