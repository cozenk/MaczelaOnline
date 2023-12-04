import { currentUser } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";

export async function getAllUsers() {
  const { rows } = await sql`SELECT * FROM users;`;

  return rows;
}

export async function getCurrentUser() {
  const clerkUser = await currentUser();

  if (!clerkUser) return console.log("Not logged in");

  const query = `SELECT * FROM users WHERE clerk_id = $1;`;
  const data = [clerkUser.id];

  const { rows } = await sql.query(query, data);

  if (rows.length) {
    return rows[0];
  }

  throw new Error("Can't find the user");
}

export async function initUserCart(userId) {
  const query = `INSERT INTO cart (user_id) VALUES($1) RETURNING *;`;
  const data = [userId];

  const { rows } = await sql.query(query, data);

  if (rows.length) {
    return console.log(`Cart ${rows[0].id} for ${userId} created`);
  }

  throw new Error("Can't initialize user cart");
}

export async function createDbUser({
  clerkId = null,
  imageUrl = null,
  firstName = null,
  lastName = null,
  email = null,
}) {
  const query = `INSERT INTO users (clerk_id, image_url, first_name, last_name, email, role)
  VALUES($1, $2, $3, $4, $5, $6) RETURNING *;`;
  const data = [clerkId, imageUrl, firstName, lastName, email, "CUSTOMER"];

  try {
    const { rows } = await sql.query(query, data);

    if (rows.length) {
      initUserCart(rows[0].id);
      return { clerkId, imageUrl, firstName, lastName, email };
    }

    return null;
  } catch (err) {
    console.error("Can't create user");
    throw err;
  }
}

export async function deleteDbUser(clerkId) {
  const selectQuery = `SELECT * FROM users WHERE clerk_id = $1;`;
  const data = [clerkId];

  const { rows } = await sql.query(selectQuery, data);
  if (rows.length) {
    const email = rows[0].email;
    const deleteQuery = "DELETE FROM users WHERE clerk_id = $1";
    await sql.query(deleteQuery, data);
    return { email };
  }

  throw new Error("Can't delete user as it doesn't exist");
}
