import { sql } from "@vercel/postgres";

export async function getMainText() {
  const { rows } =
    await sql`SELECT * FROM hero_content ORDER BY id DESC LIMIT 1;`;

  if (rows.length) {
    return rows[0].main_text;
  }

  return null;
}

export async function getSubText() {
  const { rows } =
    await sql`SELECT * FROM hero_content ORDER BY id DESC LIMIT 1;`;

  if (rows.length) {
    return rows[0].sub_text;
  }

  return null;
}

export async function updateMainText(newMainText = "") {
  const { rows: latestMainTextRows } =
    await sql`SELECT * FROM hero_content ORDER BY id DESC LIMIT 1;`;

  if (latestMainTextRows.length) {
    const { id } = latestMainTextRows[0];
    const query = `UPDATE hero_content SET main_text = $1 WHERE id=${id} RETURNING *`;
    const data = [newMainText];

    const { rows } = await sql.query(query, data);

    if (rows.length) {
      return rows[0];
    }

    throw new Error("Can't update main_text");
  } else {
    const query = `INSERT INTO hero_content(main_text) VALUES($1) RETURNING *`;
    const data = [newMainText];

    const { rows } = await sql.query(query, data);

    if (rows.length) {
      return rows[0];
    }
  }

  return null;
}

export async function updateSubText(newSubText = "") {
  const { rows: latestSubTextRows } =
    await sql`SELECT * FROM hero_content ORDER BY id DESC LIMIT 1;`;

  if (latestSubTextRows.length) {
    const { id } = latestSubTextRows[0];
    const query = `UPDATE hero_content SET sub_text = $1 WHERE id=${id} RETURNING *`;
    const data = [newSubText];

    const { rows } = await sql.query(query, data);

    if (rows.length) {
      return rows[0];
    }

    throw new Error("Can't update sub_text");
  } else {
    const query = `INSERT INTO hero_content(sub_text) VALUES($1) RETURNING *`;
    const data = [newSubText];

    const { rows } = await sql.query(query, data);

    if (rows.length) {
      return rows[0];
    }
  }

  return null;
}
