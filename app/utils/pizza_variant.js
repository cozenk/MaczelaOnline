import { sql } from "@vercel/postgres";

export async function getAllPizzaVariant() {
  const { rows } = await sql`SELECT * FROM pizza_variants ;`;

  return rows;
}

export async function createPizzaVariant({
  name = null,
  price = null,
  pizza_id = null,
}) {
  const query = `INSERT INTO pizza_variants (name, price, pizza_id)
  VALUES($1, $2, $3) RETURNING *;`;
  const data = [name, price, pizza_id];

  try {
    const { rows } = await sql.query(query, data);

    if (rows.length) {
      return { name, price, pizza_id };
    }

    return null;
  } catch (err) {
    console.error("Can't create pizza");
    throw err;
  }
}

export async function updatePizzaVariant(id, newInfo) {
  const { rows: variantRows } =
    await sql`SELECT * FROM pizza_variants WHERE id = ${id};`;

  if (variantRows.length) {
    const variant = variantRows[0];

    const columns = Object.keys(newInfo);

    const query = `UPDATE pizza_variants
    SET ${columns.map((column, index) => ` ${column} = $${index + 1}`)}
    WHERE id = ${variant.id} RETURNING *;
    `;
    const data = Object.values(newInfo);

    try {
      const { rows } = await sql.query(query, data);
      if (rows.length) return rows[0];

      throw new Error("Error updating pizza variant");
    } catch (error) {
      throw new Error(error.message);
    }
  } else {
    throw new Error("Cannot find update pizza as it doesn't exist");
  }
}

export async function deletePizzaVariant(id) {
  const { rows } = await sql`SELECT * FROM pizza_variants WHERE id = ${id};`;
  if (rows.length) {
    const name = rows[0].name;
    const deleteQuery = "DELETE FROM pizza_variants WHERE id = $1";
    const data = [id];
    await sql.query(deleteQuery, data);
    return { name };
  }

  throw new Error("Can't delete pizza as it doesn't exist");
}

export async function deleteAllPizzaVariants(pizza_id) {
  if (pizza_id)
    await sql`DELETE FROM pizza_variants WHERE pizza_id = ${pizza_id};`;
}
