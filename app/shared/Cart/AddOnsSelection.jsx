"use client";

import { Checkbox } from "@shared/checkbox";
import { formatPrice } from "@utils/formatters";

const addOns = [
  {
    id: 1,
    label: "Special cheese",
    additionalPrice: 100,
  },
  {
    id: 2,
    label: "Sweet bacon",
    additionalPrice: 100,
  },
  {
    id: 3,
    label: "Bell pepper",
    additionalPrice: 20,
  },
  {
    id: 4,
    label: "Pineapple",
    additionalPrice: 20,
  },
  {
    id: 5,
    label: "Mushroom",
    additionalPrice: 20,
  },
];

export default function AddOnsSelection({
  selectedAddOns = [],
  onChangeSelectedAddOns = () => {},
}) {
  return (
    <div className="add-ons-selection space-y-4">
      {addOns.map((addOn) => (
        <div
          className="flex items-start justify-between space-x-2"
          key={addOn.id}
        >
          <label
            htmlFor={addOn.label}
            className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {addOn.label} (+
            {formatPrice(addOn.additionalPrice, {
              withoutDecimals: true,
            })}
            )
          </label>
          <Checkbox
            className="dark:border-white"
            id={addOn.label}
            checked={selectedAddOns.some(
              (selected) => selected.id === addOn.id,
            )}
            onCheckedChange={(value) => onChangeSelectedAddOns(value, addOn)}
          />
        </div>
      ))}
    </div>
  );
}
