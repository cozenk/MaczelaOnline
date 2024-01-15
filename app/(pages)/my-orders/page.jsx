import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { formatDate, formatPrice } from "@utils/formatters";
import { getCurrentUserOrders } from "@utils/orders";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const dynamic = "force-dynamic";

export default async function Orders({ searchParams }) {
  const { highlight } = searchParams;

  const orders = await getCurrentUserOrders();

  const totalAmountSpent = orders.reduce(
    (total, order) => total + Number(order.total_price),
    0,
  );

  return (
    <div className="overflow-y-auto  px-10 pb-16 pt-10 lg:h-[100vh] lg:px-28">
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
          <span className=" text-2xl font-bold text-green-700 dark:text-green-500">
            {formatPrice(totalAmountSpent)}
          </span>
        </div>
      </div>

      <section className="orders mt-10 flex flex-col items-start gap-20 border-t border-t-gray-300 py-10">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order.id}
              className={`w-full rounded-lg  bg-gray-800 px-10 py-5 dark:bg-gray-800 ${
                highlight === String(order.id)
                  ? "bg-gray-800 text-white dark:bg-white dark:text-black"
                  : ""
              }`}
            >
              <div className="order-info flex flex-wrap items-start justify-between gap-y-2">
                <div className="left-info">
                  <div>
                    <label className="text-gray-500 dark:text-gray-400">
                      Order ID:
                    </label>{" "}
                    <span className="underline">{order.id}</span>
                  </div>
                  <div>
                    <label className="text-gray-500 dark:text-gray-400">
                      {" "}
                      Date placed:{" "}
                    </label>
                    <span className="">{formatDate(order.placed_date)}</span>
                  </div>
                  <div>
                    <label className="text-gray-500 dark:text-gray-400">
                      {" "}
                      Status:{" "}
                    </label>
                    <span className="">{order.status}</span>
                  </div>
                </div>
                <div className="right-info">
                  <h2>
                    Order total (+ shipping fee):{" "}
                    <span className="text-lg font-semibold text-green-700 dark:text-green-500">
                      {formatPrice(order.total_price)}
                    </span>
                  </h2>
                  <h2>
                    Total pizzas:{" "}
                    <span className="text-lg font-semibold text-green-700 dark:text-green-500">
                      {order.total_items}
                    </span>
                  </h2>
                </div>
              </div>

              <div className="items flex flex-wrap items-center gap-10">
                {order.items.map((item) => (
                  <div key={item.id} className="mt-5 rounded-lg pb-5">
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
                          {formatPrice(item.price)}{" "}
                          <span className="ml-2 text-gray-600">
                            x{item.quantity}
                          </span>
                        </div>
                        <div className="total">
                          Total:{" "}
                          <span className="font-semibold text-green-700 dark:text-green-500">
                            {formatPrice(item.quantity * item.price)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <h2 className="mt-5 w-full text-center text-3xl">
            You still haven't ordered anything :(
          </h2>
        )}
      </section>
    </div>
  );
}
