import { sql } from "@vercel/postgres";
import { getAllCustomers, getCurrentUser, getUserById } from "./users";

export async function getAllOrders() {
  const { rows: orderRows } =
    await sql`SELECT * FROM orders ORDER BY placed_date DESC;`;

  if (orderRows.length) {
    const ordersWithItemsAndCustomer = Promise.all(
      orderRows.map(async (order) => {
        const { rows: orderItems } =
          await sql`SELECT * FROM order_items WHERE order_id = ${order.id};`;

        const customer = await getUserById(order.user_id);

        return {
          ...order,
          items: orderItems.length ? orderItems : [],
          customer: customer,
        };
      }),
    );

    return await ordersWithItemsAndCustomer;
  }

  return [];
}

export async function getAllPendingOrders() {
  const { rows: pendingOrderRows } =
    await sql`SELECT * FROM orders WHERE status = 'PLACED' ORDER BY placed_date DESC;`;

  return pendingOrderRows;
}

export async function getCurrentUserRecentOrder() {
  const user = await getCurrentUser();

  const { rows } =
    await sql`SELECT * FROM orders WHERE user_id = ${user.id} ORDER BY placed_date DESC LIMIT 1;`;

  if (rows.length) {
    const order = rows[0];

    const { rows: orderItemRows } =
      await sql`SELECT * FROM order_items WHERE order_id = ${order.id};`;

    return {
      ...order,
      items: orderItemRows.length ? orderItemRows : [],
    };
  }

  return null;
}

export async function getCurrentUserOrders() {
  const user = await getCurrentUser();

  const { rows: orderRows } =
    await sql`SELECT * FROM orders WHERE user_id = ${user.id} ORDER BY placed_date DESC;`;

  if (orderRows.length) {
    const ordersWithItems = Promise.all(
      orderRows.map(async (order) => {
        const { rows: orderItemRows } =
          await sql`SELECT * FROM order_items WHERE order_id = ${order.id};`;

        return {
          ...order,
          items: orderItemRows.length ? orderItemRows : [],
        };
      }),
    );

    return await ordersWithItems;
  }

  return [];
}

export async function updateOrder(orderId, newInfo) {
  const { rows: orderRows } =
    await sql`SELECT * FROM orders WHERE id = ${orderId};`;

  if (orderRows.length) {
    const order = orderRows[0];

    const columns = Object.keys(newInfo);

    const query = `UPDATE orders
    SET ${columns.map((column, index) => ` ${column} = $${index + 1}`)}
    WHERE id = ${order.id} RETURNING *;
    `;
    const data = Object.values(newInfo);

    try {
      const { rows } = await sql.query(query, data);
      if (rows.length) return rows[0];

      throw new Error("Error updating order");
    } catch (error) {
      throw new Error(error.message);
    }
  } else {
    throw new Error("Cannot find update order as it doesn't exist");
  }
}

export async function createOrder(
  userId,
  { cartItems, totalPrice, totalItems, shippingAddress },
) {
  const query = `INSERT INTO orders (user_id, status, total_price, total_items, shipping_address) VALUES($1, $2, $3, $4, $5) RETURNING *;`;
  const data = [userId, "PLACED", totalPrice, totalItems, shippingAddress];

  const { rows } = await sql.query(query, data);

  if (rows.length) {
    const order = rows[0];
    const orderItems = await createOrderItems(order.id, cartItems);
    return { orderId: order.id, items: orderItems };
  }

  return undefined;
}

export async function deleteOrder(orderId) {
  if (orderId) {
    const { rows } = await sql`SELECT * FROM orders WHERE id = ${orderId};`;

    if (rows.length) {
      const deleteQuery = "DELETE FROM orders WHERE id = $1";
      const data = [orderId];

      await sql.query(deleteQuery, data);
      return { orderId };
    }

    throw new Error("Can't delete order as it doesn't exist");
  }
}

export async function createOrderItems(orderId, orderItems) {
  const extractPizzaId = (input = "") => {
    if (typeof input === "string") {
      const match = input.match(/(\d+)-\S+/);

      if (match) {
        const numberBeforeHyphen = match[1];
        return numberBeforeHyphen; // Output: "38"
      }

      return null;
    }

    return null;
  };

  const query = `INSERT INTO order_items (order_id, pizza_id, name, price, size, quantity, image_url)
VALUES
${orderItems.map(
  (item) =>
    `('${orderId}', '${extractPizzaId(item.pizzaId) || item.pizzaId}', "${
      item.name
    }", ${item.price}, '${item.size}', ${item.quantity}, '${item.imageSrc}')
`,
)} RETURNING *;`;

  const { rows } = await sql.query(query);

  if (rows.length) return rows;

  throw new Error(`Can't create order items for ${orderId}`);
}
