"use client";

import Modal from "@shared/Modal";
import { useEffect, useState } from "react";
import { addNewPizza } from "../../actions";
import SubmitButton from "@shared/EditUserInfo/SubmitButton";
import { useFormState } from "react-dom";
import ImageField from "../ImageField";
import { Separator } from "(pages)/admin/components/ui/separator";
import PriceInput from "@shared/PriceInput";
import VariantFields from "./VariantFields";

export default function AddPizzaModal({
  show,
  onClose = () => {},
  modalStyles = "",
}) {
  const [openedVariantFields, setOpenedVariantFiedls] = useState([]);

  const [isReadyToSubmit, setIsReadyToSubmit] = useState(true);

  const addNewPizzaWithVariants = addNewPizza.bind(null, openedVariantFields);
  const [state, formAction] = useFormState(addNewPizzaWithVariants, {
    infoSaved: false,
  });

  useEffect(() => {
    if (show) document.body.style.overflowY = "hidden";
    else document.body.style.overflowY = "auto";
  }, [show]);

  useEffect(() => {
    if (state.infoSaved) {
      onClose();
      setOpenedVariantFiedls([]);

      state.infoSaved = false;
    }
  }, [state.infoSaved]);

  return (
    <Modal show={show} className={modalStyles} onClose={onClose}>
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
              <PriceInput
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
              className="dark:rign-gray-black block w-full rounded-md border-0 px-2 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-black sm:text-sm sm:leading-6"
            >
              <option selected disabled>
                Select Size
              </option>
              <option value={`Medium 10"`}>Medium 10"</option>
              <option value={`Large 12"`}>Large 12"</option>
              <option value={`Super 20"`}>Super 20"</option>
            </select>
          </div>
          <Separator className="my-4" />
          <VariantFields
            openedFields={openedVariantFields}
            setOpenedFiedls={setOpenedVariantFiedls}
          />
        </div>

        <SubmitButton
          disabled={
            !isReadyToSubmit || openedVariantFields.some((field) => field.error)
          }
          disabledText={
            openedVariantFields.some((field) => field.error)
              ? "Save"
              : "Loading..."
          }
        />
      </form>
    </Modal>
  );
}
