import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function SlideMenu({
  isOpen = false,
  closeMenu = () => {},
  children,
}) {
  return (
    <Transition.Root as={Fragment} show={isOpen}>
      <Dialog as="div" className="relative z-50" onClose={closeMenu}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity dark:bg-black dark:bg-opacity-75" />
        </Transition.Child>

        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-500"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-500"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel
              className={
                "pointer-events-auto h-full w-full overflow-y-auto bg-white px-6 py-6 outline outline-black dark:bg-black  dark:outline-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
              }
            >
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
