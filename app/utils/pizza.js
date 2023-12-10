import { sql } from "@vercel/postgres";

export async function getAllPizzas() {
  const { rows } = await sql`SELECT * FROM pizza ;`;

  return rows;
}

export async function getPizzasByCategory(category) {
  if (category) {
    const query = `SELECT * FROM pizza WHERE category = $1;`;
    const data = [category];

    const { rows } = await sql.query(query, data);

    if (!rows.length)
      return console.log(`No exiting pizzas by category of ${category}`);

    return rows;
  }
}

export async function createPizza({
  name = null,
  image_url = null,
  category = null,
  description = null,
  price = null,
  size = null,
}) {
  const query = `INSERT INTO pizza (name, image_url, category, description, price, size)
  VALUES($1, $2, $3, $4, $5, $6) RETURNING *;`;
  const data = [name, image_url, category, description, price, size];

  try {
    const { rows } = await sql.query(query, data);

    if (rows.length) {
      return { name, image_url, category, description, price, size };
    }

    return null;
  } catch (err) {
    console.error("Can't create pizza");
    throw err;
  }
}

export async function updatePizza(pizzaId, newInfo) {
  const query = `SELECT * FROM pizza WHERE id = $1;`;
  const data = [pizzaId];

  const { rows: pizzaRows } = await sql.query(query, data);

  if (pizzaRows.length) {
    const pizza = pizzaRows[0];

    const columns = Object.keys(newInfo);

    const query = `UPDATE pizza
    SET ${columns.map((column, index) => ` ${column} = $${index + 1}`)}
    WHERE id = ${pizza.id} RETURNING *;
    `;
    const data = Object.values(newInfo);

    try {
      const { rows } = await sql.query(query, data);
      if (rows.length) return rows[0];

      throw new Error("Error updating pizza");
    } catch (error) {
      throw new Error(error.message);
    }
  } else {
    throw new Error("Cannot find update pizza as it doesn't exist");
  }
}

export async function deletePizza(pizzaId) {
  const selectQuery = `SELECT * FROM pizza WHERE id = $1;`;
  const data = [pizzaId];

  const { rows } = await sql.query(selectQuery, data);
  if (rows.length) {
    const name = rows[0].name;
    const deleteQuery = "DELETE FROM pizza WHERE id = $1 RETURNING *";
    await sql.query(deleteQuery, data);
    return { name };
  }

  throw new Error("Can't delete pizza as it doesn't exist");
}

// TODO: CRUD operations for pizza table
