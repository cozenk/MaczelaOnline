"use client";

import { Button } from "@shared/Button";
import PriceInput from "@shared/PriceInput";
import { priceRegex } from "@utils/regex";
import { PlusIcon, XIcon } from "lucide-react";

export default function VariantFields({
  openedFields = [],
  setOpenedFiedls = () => {},
}) {
  const index = openedFields.length + 1;

  return (
    <div className="mb-2">
      {openedFields.length > 0 ? (
        <>
          <h2 className="mb-4">Size variants:</h2>
          <div className="flex-start flex flex-col gap-y-4">
            {openedFields.map((field, index) => (
              <div
                key={field.id}
                className="mb-4 rounded-lg border border-white p-4 pb-8 text-sm"
              >
                <div className="flex w-full items-start justify-between">
                  <header className="mb-4 text-gray-600">
                    Variant: {index + 1}
                  </header>
                  <XIcon
                    size={16}
                    onClick={() => {
                      setOpenedFiedls((prev) =>
                        prev.filter(
                          (currentField) => currentField.id !== field.id,
                        ),
                      );
                    }}
                    className="modal-trigger cursor-pointer hover:text-gray-600"
                  />
                </div>
                <div className="flex items-end gap-2">
                  <div>
                    <label htmlFor="">Name:</label>
                    <input
                      value={field.name}
                      onChange={(e) => {
                        setOpenedFiedls((prev) =>
                          prev.map((currentField) => {
                            if (currentField.id === field.id) {
                              return {
                                ...currentField,
                                name: e.target.value,
                              };
                            }
                            return currentField;
                          }),
                        );
                      }}
                      name="name"
                      id={`variant-${field.id}-name`}
                      required
                      className="dark:rign-gray-black block w-full rounded-md border-0 px-2 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-black sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div>
                    <label htmlFor="">Price:</label>
                    <PriceInput
                      id={`variant-${field.id}-price`}
                      value={field.price}
                      onChange={(e) => {
                        if (priceRegex.test(e.target.value))
                          setOpenedFiedls((prev) =>
                            prev.map((currentField) => {
                              if (currentField.id === field.id) {
                                return {
                                  ...currentField,
                                  price: e.target.value,
                                };
                              }
                              return currentField;
                            }),
                          );
                      }}
                      required
                      className="dark:rign-gray-black block w-full rounded-md border-0  py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : null}

      <Button
        type="button"
        variant="outline"
        className="gap-2"
        onClick={() => {
          if (
            openedFields.length &&
            !openedFields[openedFields.length - 1].name
          ) {
            document
              .getElementById(`variant-${openedFields.length}-name`)
              .focus();
          } else {
            setOpenedFiedls((prev) => [
              ...prev,
              {
                id: index,
                name: "",
                price: "",
              },
            ]);
          }
        }}
      >
        Add size variant <PlusIcon size={16} />
      </Button>
    </div>
  );
}
