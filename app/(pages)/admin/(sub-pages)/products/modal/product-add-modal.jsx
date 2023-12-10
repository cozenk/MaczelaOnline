"use client";

import Modal from "@shared/Modal";
import { useEffect, useState } from "react";
import { savePizzaInfo } from "../actions";
import SubmitButton from "@shared/EditUserInfo/SubmitButton";
import { useFormState } from "react-dom";
import ImageField from "../components/ImageField";

export default function AddPizzaModal({ show, onClose, modalStyles = "" }) {
  const [state, formAction] = useFormState(savePizzaInfo, {
    infoSaved: false,
  });

  const [isReadyToSubmit, setIsReadyToSubmit] = useState(true);

  const [priceValue, setPriceValue] = useState("");

  const variantOptions = [
    { value: 'Medium 10"', label: 'Medium 10"' },
    { value: 'Large 12"', label: 'Large 12"' },
    { value: 'Super 20"', label: 'Super 20"' },
  ];

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
        <div className=" mb-5 w-96 gap-x-6 gap-y-3 ">
          <div className="mb-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 "
            >
              Pizza Name
            </label>

            <div className="mt-1">
              <input
                type="text"
                name="name"
                id="name"
                required
                className="dark:rign-gray-black block w-full rounded-md border-0  py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <ImageField setIsReadyToSubmit={setIsReadyToSubmit} />
          <div className="mb-2">
            <label
              htmlFor="category"
              className="block text-sm font-medium leading-6 "
            >
              Category
            </label>

            <div className="mt-1">
              <input
                type="text"
                name="category"
                id="category"
                required
                defaultValue={"Best sellers"}
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
                type="text"
                value={priceValue}
                onChange={(e) => {
                  const priceRegex = /^(\d+(\.\d{1,2})?)?$/;
                  if (priceRegex.test(e.target.value))
                    setPriceValue(e.target.value);
                }}
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
            <select
              defaultValue={`Medium 10"`}
              name="size"
              id="size"
              className="dark:rign-gray-black block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-black sm:text-sm sm:leading-6"
            >
              <option selected disabled>
                Select Size
              </option>
              <option value={`Medium 10"`}>Medium 10"</option>
              <option value={`Large 12"`}>Large 12"</option>
              <option value={`Super 20"`}>Super 20"</option>
            </select>
          </div>
          {/* <div className="mb-2">
            <label
              htmlFor="variant"
              className="block text-sm font-medium leading-6 "
            >
              Variant
            </label>
            <Select
              defaultValue={[variantOptions[0]]}
              closeMenuOnSelect={false}
              isMulti
              name="variant"
              options={variantOptions}
              className="basic-multi-select overlay-content dark:text-black"
              classNamePrefix="select"
            />
          </div> */}
        </div>

        <SubmitButton disabled={!isReadyToSubmit} />
      </form>
    </Modal>
  );
}
