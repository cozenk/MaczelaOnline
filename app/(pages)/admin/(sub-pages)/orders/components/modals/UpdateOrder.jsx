"use client";

import SubmitButton from "@shared/EditUserInfo/SubmitButton";
import Modal from "@shared/Modal";
import { estimatedTimeSelections } from "@utils/orders";
import { useState } from "react";

export default function UpdateOrder({
  show = false,
  onClose = () => {},
  formAction = null,
  order = null,
  disabledSubmitButton = false,
}) {
  const [selectedStatus, setSelectedStatus] = useState(null);

  return (
    <Modal show={show} onClose={onClose}>
      <header className="mb-10 text-xl font-bold">
        Update{" "}
        <span className="text-red-500">{order.customer.full_name}'s</span> order
      </header>
      <form action={formAction} className="mx-auto">
        <div className="mb-5 w-96 space-y-2">
          <input type="hidden" id="order_id" name="order_id" value={order.id} />
          <input
            type="hidden"
            id="customer_email"
            name="customer_email"
            value={order?.customer?.email}
          />

          <div>
            Status:{" "}
            <select
              name="order_status"
              id="order_status"
              className="w-28 dark:bg-black"
              value={selectedStatus || order.status}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
              }}
            >
              <option value={"PLACED"}>TO CONFIRM</option>
              <option value={"PREPARING"}>PREPARING</option>
              <option value={"TO DELIVER"}>TO DELIVER</option>
              <option value={"DELIVERED"}>DELIVERED</option>
            </select>
          </div>

          {selectedStatus === "PREPARING" || selectedStatus === "TO DELIVER" ? (
            <div>
              Estimated time:{" "}
              <select
                name="estimated_time"
                id="estimated_time"
                className="w-28 dark:bg-black"
                defaultValue={30}
              >
                {estimatedTimeSelections.map((time) => (
                  <option value={time}>{time} mins.</option>
                ))}
              </select>
            </div>
          ) : null}

          <div>
            Is paid:{" "}
            <select
              name="is_completed"
              id="is_completed"
              className="w-28 dark:bg-black"
              defaultValue={order.is_completed}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
        </div>
        <SubmitButton disabled={disabledSubmitButton} />
      </form>
    </Modal>
  );
}
