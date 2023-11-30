import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { getCurrentUserOrders } from "@utils/orders";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Orders() {
  const orders = await getCurrentUserOrders();

  const totalAmountSpent = orders.reduce(
    (total, order) => total + Number(order.total_price),
    0,
  );

  return (
    <div className="overflow-y-auto bg-white px-10 pb-16 pt-10 lg:h-[100vh] lg:px-28">
      <div className="flex w-full items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My orders</h1>

          <Link
            href={"/"}
            className="mt-10 flex items-center gap-2 hover:text-gray-500"
          >
            <ArrowLeftIcon className="mb-[2px] w-5" /> Back to home
          </Link>
        </div>

        <div className="text-right">
          <h2 className="text-lg">Total amount spent for pizzas: </h2>
          <span className=" text-2xl font-bold text-green-700">
            ₱{totalAmountSpent}
          </span>
        </div>
      </div>

      <section className="orders mt-10 flex flex-col items-start gap-20 border-t border-t-gray-300 py-10">
        {orders.map((order) => (
          <div className="w-full rounded-lg bg-gray-100 px-10 py-5">
            <div className="order-info flex items-start justify-between">
              <div>
                <h2 className="">
                  <span className="text-gray-700">Order ID:</span>{" "}
                  <span className="underline">{order.id}</span>
                </h2>
                <h2>
                  <span className="text-gray-700"> Date placed: </span>
                  <span className="">
                    {new Date(order.placed_date).toLocaleString("en-PH", {
                      timeZone: "Asia/Manila",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                    })}
                  </span>
                </h2>
              </div>
              <div className="order-totals">
                <h2>
                  Order total:{" "}
                  <span className="text-lg font-semibold text-green-700">
                    ₱{Number(order.total_price).toLocaleString()}
                  </span>
                </h2>
                <h2>
                  Total pizzas:{" "}
                  <span className="text-lg font-semibold text-green-700">
                    {order.total_items}
                  </span>
                </h2>
              </div>
            </div>

            <div className="items flex flex-wrap items-center gap-10">
              {order.items.map((item) => (
                <div className="mt-5 rounded-lg pb-5">
                  <div className="h-60 w-60 overflow-hidden rounded-lg bg-gray-200">
                    <Link href={`/pizza/${item.pizza_id}`}>
                      <Image
                        src={item.image_url}
                        width={340}
                        height={340}
                        alt={item.description || "Some image description"}
                        className="h-full w-full object-cover object-center hover:opacity-75"
                      />
                    </Link>
                  </div>
                  <div className="item-info flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{item.name}</span>{" "}
                      <span className="text-gray-600">
                        {item.size || 'Medium 10"'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="price-quantity">
                        ₱{item.price}{" "}
                        <span className="ml-2 text-gray-600">
                          x{item.quantity}
                        </span>
                      </div>
                      <div className="total">
                        Total:{" "}
                        <span className="font-semibold text-green-700">
                          ₱{item.quantity * item.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
