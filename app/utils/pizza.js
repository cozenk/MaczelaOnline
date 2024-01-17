import { sql } from "@vercel/postgres";

export async function getAllPizzas({ size }) {
  const { rows } = !size
    ? await sql`SELECT * FROM pizza;`
    : await sql`SELECT * FROM pizza WHERE size = ${size}`;

  if (rows.length) {
    const pizzasWithVariants = Promise.all(
      rows.map(async (pizza) => {
        const { rows: variants } =
          await sql`SELECT * FROM pizza_variants WHERE pizza_id = ${pizza.id};`;

        return {
          ...pizza,
          variants: variants.length ? variants : [],
        };
      }),
    );

    return await pizzasWithVariants;
  }

  return [];
}

export async function getPizzaById(pizzaId = "") {
  if (pizzaId) {
    const { rows } = await sql`SELECT * FROM pizza WHERE id = ${pizzaId};`;

    if (rows.length) {
      const pizza = rows[0];

      const { rows: variants } =
        await sql`SELECT * FROM pizza_variants WHERE pizza_id = ${pizza.id};`;

      return {
        ...pizza,
        variants: variants.length ? variants : [],
      };
    }

    throw new Error("Can't find Pizza");
  }
}

export async function getPizzasByCategory(category) {
  if (category) {
    const { rows } =
      await sql`SELECT * FROM pizza WHERE category = ${category}`;

    if (!rows.length)
      return console.log(`No exiting pizzas by category of ${category}`);

    if (rows.length) {
      const pizzasWithVariants = Promise.all(
        rows.map(async (pizza) => {
          const { rows: variants } =
            await sql`SELECT * FROM pizza_variants WHERE pizza_id = ${pizza.id};`;

          return {
            ...pizza,
            variants: variants.length ? variants : [],
          };
        }),
      );

      return await pizzasWithVariants;
    }
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
      return rows[0];
    }

    return null;
  } catch (err) {
    console.error("Can't create pizza");
    throw err;
  }
}

export async function updatePizza(pizzaId, newInfo) {
  const { rows: pizzaRows } =
    await sql`SELECT * FROM pizza WHERE id = ${pizzaId};`;

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
  const { rows } = await sql`SELECT * FROM pizza WHERE id = ${pizzaId};`;
  if (rows.length) {
    const name = rows[0].name;
    const deleteQuery = "DELETE FROM pizza WHERE id = $1 RETURNING *";
    const data = [pizzaId];
    await sql.query(deleteQuery, data);
    return { name };
  }

  throw new Error("Can't delete pizza as it doesn't exist");
}
