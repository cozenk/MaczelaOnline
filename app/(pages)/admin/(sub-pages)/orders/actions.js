"use server";

import { deleteOrder, updateOrder } from "@utils/orders";
import { revalidatePath } from "next/cache";
import { transporter, mailOptions } from "@utils/nodemailer";

export async function updateOrderInfo(prevState, formData) {
  if (formData) {
    const orderId = formData.get("order_id");
    const order_status = formData.get("order_status");
    const is_completed = formData.get("is_completed");
    const customer_email = formData.get("customer_email");
    const estimated_time = formData.get("estimated_time");

    const newOrderInfo = {
      status: order_status,
      is_completed,
      ...(order_status === "PREPARING" && {
        estimated_preparation_time: `${estimated_time} minutes`,
      }),
      ...(order_status === "TO DELIVER" && {
        estimated_delivery_time: `${estimated_time} minutes`,
      }),
    };

    try {
      const { status, estimated_preparation_time, estimated_delivery_time } =
        await updateOrder(orderId, newOrderInfo);

      const getEmailContentFromStatus = () => {
        switch (status) {
          case "PREPARING":
            return {
              subject: `We are now preparing your order - Order ID: ${orderId}`,
              text: `We are now preparing your order - Order ID: ${orderId}`,
              html: `<h1>Preparing!</h1><p>Hello, this is to notify you that <a href='https://maczela-online.vercel.app/my-orders?highlight=${orderId}'>your order</a> will be prepared to deliver in ${estimated_preparation_time}</p>`,
            };

          case "TO DELIVER":
            return {
              subject: `Your pizza is out for delivery - Order ID: ${orderId}`,
              text: `Your pizza is out for delivery - Order ID: ${orderId}`,
              html: `<h1>To Deliver!</h1><p>Hello, this is to notify you that <a href='https://maczela-online.vercel.app/my-orders?highlight=${orderId}'>your order</a> will be delivered to you in ${estimated_delivery_time}</p>`,
            };

          case "DELIVERED":
            return {
              subject: `Your pizza was delivered - Order ID: ${orderId}`,
              text: `our pizza was delivered - Order ID: ${orderId}`,
              html: `<h1>Delivered!</h1><p>Hello, this is to notify you that <a href='https://maczela-online.vercel.app/my-orders?highlight=${orderId}'>your order</a> has been completed. We look forward seeing you again!</p>`,
            };

          default: {
            return {
              subject: `Order ${orderId} status: ${order_status}`,
              text: `Order ${orderId} status: ${order_status}`,
              html: `<h1>Order Status</h1><p>Hello this is to notify you that <a href='https://maczela-online.vercel.app/my-orders?highlight=${orderId}'>your order</a> status is now ${order_status}</p>`,
            };
          }
        }
      };

      await transporter.sendMail({
        ...mailOptions,
        to: customer_email,
        ...getEmailContentFromStatus(),
      });

      revalidatePath("/");
      revalidatePath("/admin");

      return {
        infoSaved: true,
        isError: false,
      };
    } catch (error) {
      console.error(error);

      return {
        infoSaved: false,
        isError: true,
      };
    }
  }

  return {
    infoSaved: false,
    isError: true,
  };
}

export async function deleteOrderAction(id) {
  try {
    await deleteOrder(id);

    revalidatePath("/admin");

    return {
      orderDeleted: true,
      isError: false,
    };
  } catch (error) {
    return {
      orderDeleted: false,
      isError: true,
    };
  }
}
