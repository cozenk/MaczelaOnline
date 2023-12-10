"use client";

import Modal from "@shared/Modal";
import { useContext, useEffect } from "react";
import { updatePizzaInfo } from "../actions";
import SubmitButton from "@shared/EditUserInfo/SubmitButton";
import { useFormState } from "react-dom";
import Skeleton from "react-loading-skeleton";
import { Button } from "(pages)/admin/components/ui/button";

export default function UpdatePizzaModal({
  show,
  onClose,
  initialData = null,
  user = null,
  focusTo = "",
  modalStyles = "",
}) {
  const [state, formAction] = useFormState(updatePizzaInfo, {
    infoSaved: false,
  });

  useEffect(() => {
    if (focusTo) {
      const element = document.getElementById(focusTo);

      if (element) {
        element.focus();
        element.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  }, [focusTo]);

  useEffect(() => {
    if (show) document.body.style.overflowY = "hidden";
    else document.body.style.overflowY = "auto";
  }, [show]);

  useEffect(() => {
    if (state.infoSaved) {
      onClose();

      state.infoSaved = false;
    }
  }, [state.infoSaved]);

  return (
    <Modal className={modalStyles} show={show} onClose={onClose}>
      <header className="mb-10 text-xl font-bold uppercase">
        Add New Pizza
      </header>

      <form action={formAction} className="mx-auto ">
      
        <div className=" w-96 gap-x-6 gap-y-3 mb-5 ">
            <div className="mb-2">
                <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 "
                >
                    Pizza Name
                </label>
            
                <div className="mt-1">
                    <input
                        defaultValue={initialData.name}
                        type="text"
                        name="name"
                        id="name"
                        required
                        className="dark:rign-gray-black block w-full rounded-md border-0  py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <div className="mb-2">
                <label
                    htmlFor="imageurl"
                    className="block text-sm font-medium leading-6 "
                >
                    Image
                </label>
            
                <div className="mt-1">
                    <Skeleton height={35} />
                </div>
            </div>
            <div className="mb-2">
                <label
                    htmlFor="category"
                    className="block text-sm font-medium leading-6 "
                >
                    Category
                </label>
            
                <div className="mt-1">
                    <input
                        defaultValue={initialData.category}
                        type="text"
                        name="category"
                        id="category"
                        required
                        className="dark:rign-gray-black block w-full rounded-md border-0  py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <div className="mb-2">
                <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 "
                >
                    Description
                </label>
            
                <div className="mt-1">
                    <input
                        defaultValue={initialData.description}
                        type="text"
                        name="description"
                        id="description"
                        required
                        className="dark:rign-gray-black block w-full rounded-md border-0  py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <div className="mb-2">
                <label
                    htmlFor="price"
                    className="block text-sm font-medium leading-6 "
                >
                    Price
                </label>
            
                <div className="mt-1">
                    <input
                        defaultValue={initialData.price}
                        type="text"
                        name="price"
                        id="price"
                        required
                        className="dark:rign-gray-black block w-full rounded-md border-0  py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <div className="mb-2">
                <label
                    htmlFor="size"
                    className="block text-sm font-medium leading-6 "
                >
                    Size
                </label>
            
                <div className="mt-1">
                    <input
                        defaultValue={initialData.size}
                        type="text"
                        name="size"
                        id="size"
                        required
                        className="dark:rign-gray-black block w-full rounded-md border-0  py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>


        </div>
        {
            initialData ? ( <SubmitButton /> ) :
                <Button disabled={true}/>
        }
        
      </form>
    </Modal>
  );
}
