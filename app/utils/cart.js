import { sql } from "@vercel/postgres";
import { getCurrentUser } from "./users";

export async function getCurrentUserCart() {
  const user = await getCurrentUser();

  const { rows: cartRows } =
    await sql`SELECT * FROM cart WHERE user_id = ${user.id};`;

  if (cartRows.length) {
    const cart = cartRows[0];

    const { rows: cartItemRows } =
      await sql`SELECT * FROM cart_items WHERE cart_id = ${cart.id};`;

    if (cartItemRows.length) return { id: cart.id, cartItems: cartItemRows };

    return { id: cart.id, cartItems: [] };
  }
}

export async function updateBackendCart(cartId, cartItems = null) {
  console.log("ITEMS: ", cartItems);
  if (cartItems === null) {
    return null;
  }

  if (cartItems.length) {
    await sql`DELETE FROM cart_items;`;

    const query = `INSERT INTO cart_items (cart_id, pizza_id, name, price, quantity, image_url, size)
VALUES
${cartItems.map(
  (item) =>
    `('${cartId}', '${item.pizzaId}', '${item.name}', ${item.price}, ${item.quantity}, '${item.imageSrc}', '${item.size}')
`,
)} RETURNING *;`;

    const { rows } = await sql.query(query);

    return rows;
  } else {
    await sql`DELETE FROM cart_items;`;
  }
}
