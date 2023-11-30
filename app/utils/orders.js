import { sql } from "@vercel/postgres";
import { getCurrentUser } from "./users";

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
