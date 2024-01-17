"use client";

import Modal from "@shared/Modal";
import { useEffect } from "react";
import { Button } from "@shared/Button";

import { XCircle } from "lucide-react";
import { Separator } from "(pages)/admin/components/ui/separator";
import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";

export default function FilterUsers({
  show,
  onClose = () => {},
  modalStyles = "",
  filter,
  setFilter,
}) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const [isFiltering, startTransition] = useTransition();

  const applyFilter = () => {
    const params = new URLSearchParams(window.location.search);
    params.set(`role`, filter?.role);
    startTransition(() => replace(`${pathname}?${params.toString()}`));
  };

  const clearFilter = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete(`role`);
    startTransition(() => replace(`${pathname}?${params.toString()}`));
  };

  useEffect(() => {
    if (show) document.body.style.overflowY = "hidden";
    else document.body.style.overflowY = "auto";
  }, [show]);

  return (
    <Modal show={show} className={modalStyles} onClose={onClose}>
      <header className="mb-10  text-xl font-bold uppercase">
        Filter Users
      </header>

      <div className=" mb-5 flex w-96 flex-col gap-x-6 gap-y-3">
        <Button onClick={clearFilter} className="flex items-center">
          Clear Filters <XCircle className="ml-2 w-4" />
        </Button>
        <div className="mb-2">
          <label
            htmlFor="role"
            className="block text-sm font-medium leading-6 "
          >
            Role
          </label>
          <select
            defaultValue={filter?.role}
            name="role"
            id="role"
            onChange={(event) => {
              setFilter((previous) => {
                return { ...previous, role: event.target.value };
              });
            }}
            className="dark:rign-gray-black block w-full rounded-md border-0 px-2 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-black"
          >
            <option disabled>Select Role</option>
            <option value={`ADMIN`}>Admin</option>
            <option value={`STAFF`}>Staff</option>
            <option value={`DELIVERY_RIDER`}>Delivery Rider</option>
            <option value={`CUSTOMER`}>Customer</option>
          </select>
        </div>

        <Separator className="my-4" />
      </div>

      <button
        type="button"
        onClick={applyFilter}
        className={`flex
        w-full
        items-center justify-center rounded-md border border-transparent bg-green-600 px-6 py-3  text-base font-medium text-white shadow-sm hover:bg-green-700 disabled:cursor-not-allowed`}
      >
        {isFiltering ? "Loading..." : "Save"}
      </button>
    </Modal>
  );
}
