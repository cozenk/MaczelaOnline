import CartItems from "@shared/Cart/CartItems";
import Section from "../Section";
import Total from "./Total";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import OrderNotes from "../OrderNotes";

export default function OrderSummary() {
  const { pending } = useFormStatus();

  return (
    <Section title="Order summary" titleColor="text-green-700 dark:text-white">
      <CartItems />
      <OrderNotes />
      <Total />
      <div className="mt-6">
        <button
          type="submit"
          disabled={pending}
          className={`${pending ? "bg-gray-300" : "bg-green-600"} ${
            pending ? "hover:bg-gray-300" : "hover:bg-green-700"
          } flex w-full items-center justify-center rounded-md border border-transparent px-6  py-3 text-base font-medium text-white shadow-sm disabled:cursor-not-allowed`}
        >
          {pending ? "Loading..." : "Confirm order"}
        </button>
      </div>
      <div className="mt-6 flex justify-center text-center text-sm text-gray-500 hover:text-gray-300 dark:text-gray-200">
        <p>
          <Link href={"/"} className="font-medium">
            Go back
          </Link>
        </p>
      </div>
    </Section>
  );
}
