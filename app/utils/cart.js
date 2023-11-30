import { sql } from "@vercel/postgres";
import { getCurrentUser } from "./users";

export async function getCurrentUserCart() {
  const user = await getCurrentUser();

  const query = `SELECT * FROM cart WHERE user_id = $1;`;
  const data = [user.id];
  const { rows: cartRows } = await sql.query(query, data);

  if (cartRows.length) {
    const cart = cartRows[0];

    const query = `SELECT * FROM cart_items WHERE cart_id = $1;`;
    const data = [cart.id];

    const { rows: cartItemRows } = await sql.query(query, data);

    if (cartItemRows.length) return { id: cart.id, cartItems: cartItemRows };

    return { id: cart.id, cartItems: [] };
  }
}

export async function syncBackendCart(cartId, cartItems) {
  if (cartItems.length) {
    await sql`DELETE FROM cart_items`;

    const query = `INSERT INTO cart_items (cart_id, pizza_id, name, price, quantity, image_url)
VALUES
${cartItems.map(
  (item) =>
    `('${cartId}', '${item.pizzaId}', '${item.name}', ${item.price}, ${item.quantity}, '${item.imageSrc}')
`,
)} RETURNING *;`;

    const { rows } = await sql.query(query);

    return rows;
  }
}
