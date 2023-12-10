import { sql } from "@vercel/postgres";
import { getAllCustomers, getCurrentUser, getUserById } from "./users";

export async function getAllOrders() {
  const query = `SELECT * FROM orders ORDER BY placed_date DESC;`;

  const { rows: orderRows } = await sql.query(query);

  if (orderRows.length) {
    const ordersWithItemsAndCustomer = Promise.all(
      orderRows.map(async (order) => {
        const query = `SELECT * FROM order_items WHERE order_id = $1;`;
        const data = [order.id];
        const { rows: orderItems } = await sql.query(query, data);

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

export async function getCurrentUserOrders() {
  const user = await getCurrentUser();

  const query = `SELECT * FROM orders WHERE user_id = $1 ORDER BY placed_date DESC;`;
  const data = [user.id];

  const { rows: orderRows } = await sql.query(query, data);

  if (orderRows.length) {
    const ordersWithItems = Promise.all(
      orderRows.map(async (order) => {
        const query = `SELECT * FROM order_items WHERE order_id = $1;`;
        const data = [order.id];

        const { rows: orderItemRows } = await sql.query(query, data);

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

export async function createOrder(
  userId,
  { cartItems, totalPrice, totalItems },
) {
  console.log(userId, cartItems, totalPrice, totalItems);

  const query = `INSERT INTO orders (user_id, status, total_price, total_items) VALUES($1, $2, $3, $4) RETURNING *;`;
  const data = [userId, "PLACED", totalPrice, totalItems];

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
    const selectQuery = `SELECT * FROM orders WHERE id = $1;`;
    const data = [orderId];
    const { rows } = await sql.query(selectQuery, data);

    if (rows.length) {
      const deleteQuery = "DELETE FROM orders WHERE id = $1";
      await sql.query(deleteQuery, data);
      return { orderId };
    }

    throw new Error("Can't delete order as it doesn't exist");
  }
}

export async function createOrderItems(orderId, orderItems) {
  const query = `INSERT INTO order_items (order_id, pizza_id, name, price, quantity, image_url)
VALUES
${orderItems.map(
  (item) =>
    `('${orderId}', '${item.pizzaId}', '${item.name}', ${item.price}, ${item.quantity}, '${item.imageSrc}')
`,
)} RETURNING *;`;

  const { rows } = await sql.query(query);

  if (rows.length) return rows;

  throw new Error(`Can't create order items for ${orderId}`);
}
