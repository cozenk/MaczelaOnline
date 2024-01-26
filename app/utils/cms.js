import { sql } from "@vercel/postgres";

export async function getCmsLatestRow() {
  const { rows } = await sql`SELECT * FROM cms ORDER BY id DESC LIMIT 1;`;

  if (rows.length) {
    return rows[0];
  }

  return null;
}

export async function getHeroMainText() {
  const row = await getCmsLatestRow();

  if (row) {
    return row.hero_main_text;
  }

  return null;
}

export async function getHeroSubText() {
  const row = await getCmsLatestRow();

  if (row) {
    return row.hero_sub_text;
  }

  return null;
}

export async function getBrandIcon() {
  const row = await getCmsLatestRow();

  if (row) {
    return row.brand_icon_url;
  }

  return null;
}

export async function getHomeBgUrl() {
  const row = await getCmsLatestRow();

  if (row) {
    return row.home_bg_url;
  }

  return null;
}

export async function updateHeroMainText(newMainText = "") {
  const row = await getCmsLatestRow();

  if (row) {
    const { id } = row;
    const query = `UPDATE cms SET hero_main_text = $1 WHERE id=${id} RETURNING *`;
    const data = [newMainText];

    const { rows } = await sql.query(query, data);

    if (rows.length) {
      return rows[0];
    }

    throw new Error("Can't update hero_main_text");
  } else {
    const query = `INSERT INTO cms(hero_main_text) VALUES($1) RETURNING *`;
    const data = [newMainText];

    const { rows } = await sql.query(query, data);

    if (rows.length) {
      return rows[0];
    }
  }

  return null;
}

export async function updateHeroSubText(newSubText = "") {
  const row = await getCmsLatestRow();

  if (row) {
    const { id } = row;
    const query = `UPDATE cms SET hero_sub_text = $1 WHERE id=${id} RETURNING *`;
    const data = [newSubText];

    const { rows } = await sql.query(query, data);

    if (rows.length) {
      return rows[0];
    }

    throw new Error("Can't update hero_sub_text");
  } else {
    const query = `INSERT INTO cms(hero_sub_text) VALUES($1) RETURNING *`;
    const data = [newSubText];

    const { rows } = await sql.query(query, data);

    if (rows.length) {
      return rows[0];
    }
  }

  return null;
}

export async function updateBrandIcon(brandIconUrl = "") {
  const row = await getCmsLatestRow();

  if (row) {
    const { id } = row;
    const query = `UPDATE cms SET brand_icon_url = $1 WHERE id=${id} RETURNING *`;
    const data = [brandIconUrl];

    const { rows } = await sql.query(query, data);

    if (rows.length) {
      return rows[0];
    }

    throw new Error("Can't update brand_icon_url");
  } else {
    const query = `INSERT INTO cms(brand_icon_url) VALUES($1) RETURNING *`;
    const data = [brandIconUrl];

    const { rows } = await sql.query(query, data);

    if (rows.length) {
      return rows[0];
    }
  }

  return null;
}

export async function updateHomeBgUrl(homeBgUrl = "") {
  const row = await getCmsLatestRow();

  if (row) {
    const { id } = row;
    const query = `UPDATE cms SET home_bg_url = $1 WHERE id=${id} RETURNING *`;
    const data = [homeBgUrl];

    const { rows } = await sql.query(query, data);

    if (rows.length) {
      return rows[0];
    }

    throw new Error("Can't update home_bg_url");
  } else {
    const query = `INSERT INTO cms(home_bg_url) VALUES($1) RETURNING *`;
    const data = [homeBgUrl];

    const { rows } = await sql.query(query, data);

    if (rows.length) {
      return rows[0];
    }
  }

  return null;
}
