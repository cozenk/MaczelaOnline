import { currentUser } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";

export async function getAllUsers() {
  const { rows } =
    await sql`SELECT * FROM users ORDER BY role DESC, created_at DESC;`;

  if (rows.length) {
    return rows.map((user) => {
      return {
        ...user,
        full_name: getFullName(user),
        address: getFullAddress(user),
      };
    });
  }
  return [];
}

export async function updateUserInfo(userId, newUserInfo) {
  const { rows: userRows } =
    await sql`SELECT * FROM users WHERE id = ${userId};`;

  if (userRows.length) {
    const user = userRows[0];

    const columns = Object.keys(newUserInfo);

    const query = `UPDATE users
    SET ${columns.map((column, index) => ` ${column} = $${index + 1}`)}
    WHERE id = ${user.id} RETURNING *;
    `;
    const data = Object.values(newUserInfo);

    try {
      const { rows } = await sql.query(query, data);
      if (rows.length) return rows[0];

      throw new Error("Error updating user");
    } catch (error) {
      throw new Error(error.message);
    }
  } else {
    throw new Error("Cannot find update user as it doesn't exist");
  }
}

export async function getAllCustomers() {
  const { rows } = await sql`SELECT * FROM users WHERE role = 'CUSTOMER';`;

  return rows;
}

export async function getCurrentUser() {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) return null;

    const { rows } =
      await sql`SELECT * FROM users WHERE clerk_id = ${clerkUser.id};`;

    if (rows.length) {
      const user = rows[0];

      return {
        ...user,
        full_name: getFullName(user),
        address: getFullAddress(user),
      };
    }

    return null;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUserById(userId = null) {
  if (userId) {
    const { rows } = await sql`SELECT * FROM users WHERE id = ${userId};`;

    if (rows.length) {
      const user = rows[0];

      return {
        ...user,
        full_name: getFullName(user),
        address: getFullAddress(user),
      };
    }

    throw new Error("Can't find user");
  }

  return null;
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
  const { rows } = await sql`SELECT * FROM users WHERE clerk_id = ${clerkId};`;
  if (rows.length) {
    const email = rows[0].email;
    const deleteQuery = "DELETE FROM users WHERE clerk_id = $1";
    const data = [clerkId];
    await sql.query(deleteQuery, data);

    return { email };
  }

  throw new Error("Can't delete user as it doesn't exist");
}

export async function makeUserAdmin(userId) {
  const { rows } = await sql`SELECT * FROM users WHERE id = ${userId}`;

  if (rows.length) {
    const updateQuery = "UPDATE users SET role = $1 WHERE id = $2 RETURNING *";
    const updateData = ["ADMIN", userId];

    const { rows: updatedUserRows } = await sql.query(updateQuery, updateData);

    if (updatedUserRows.length) return updatedUserRows[0];

    throw new Error("Can't update user to admin");
  }

  throw new Error("Can't update user. User doesn't exist");
}

export async function updateUserRole(userId, role) {
  const { rows } = await sql`SELECT * FROM users WHERE id = ${userId}`;

  if (rows.length) {
    const updateQuery = "UPDATE users SET role = $1 WHERE id = $2 RETURNING *";
    const updateData = [role, userId];

    const { rows: updatedUserRows } = await sql.query(updateQuery, updateData);

    if (updatedUserRows.length) return updatedUserRows[0];

    throw new Error("Can't update user role");
  }

  throw new Error("Can't update user role. User doesn't exist");
}

const getFullName = (user = null) => {
  if (!user) return null;

  if (user.first_name && user.last_name) {
    return `${user.first_name} ${user.last_name}`;
  }

  if (user.first_name) {
    return user.first_name;
  }

  if (user.last_name) {
    return user.last_name;
  }

  return null;
};

const getFullAddress = (user = null) => {
  if (!user) return null;

  if (user.complete_address && user.city && user.province && user.postal_code)
    return `${user.complete_address}, ${user.city}, ${user.province}, ${user.postal_code}`;

  return null;
};
