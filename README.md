## Maczela's Pizza Online Shop

**Running the app locally..**

First, run the development server:

```bash
npm run dev
```

Then, open the ngrok application and type in.
This will ensure Clerk's newly created users will be synced to our database.

```powershell
ngrok http 3000
```

---

**SQL Queries**

To initialize the tables:

```sql
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	clerk_id VARCHAR(255) NOT NULL,
	image_url VARCHAR(255),
	first_name VARCHAR(255),
	last_name VARCHAR(255),
	mobile_number VARCHAR(11),
	email VARCHAR(255) NOT NULL,
	street_address VARCHAR(255),
	city VARCHAR(255),
	province VARCHAR(255),
	postal_code VARCHAR(10),
	role VARCHAR(10) NOT NULL,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pizza (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255),
	image_url VARCHAR(255),
	category VARCHAR(255),
	description VARCHAR(255),
	price DECIMAL(10, 2),
	size VARCHAR(255)
);

CREATE TABLE cart (
	id SERIAL PRIMARY KEY,
	user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE cart_items (
	id SERIAL PRIMARY KEY,
	cart_id INT REFERENCES cart(id) ON DELETE CASCADE,
	pizza_id INT UNIQUE REFERENCES pizza(id) ON DELETE CASCADE,
	name VARCHAR(255),
	price DECIMAL(10, 2),
	quantity INT,
	image_url VARCHAR(255),
	size VARCHAR(255)
);

CREATE TABLE orders (
	id SERIAL PRIMARY KEY,
	status VARCHAR(255),
	placed_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	is_completed BOOLEAN DEFAULT false,
	user_id INT REFERENCES users(id) ON DELETE CASCADE,
	total_price DECIMAL(10, 2),
	total_items VARCHAR(255)
);

CREATE TABLE order_items (
	id SERIAL PRIMARY KEY,
	order_id INT REFERENCES orders(id) ON DELETE CASCADE,
	pizza_id INT REFERENCES pizza(id),
	name VARCHAR(255),
	price DECIMAL(10, 2),
	quantity INT,
	size VARCHAR(255),
	image_url VARCHAR(255)
);
```

To delete a table _(Edit as you need)_:

```sql
DROP TABLE pizza;
```

To insert a pizza _(Edit as you need)_:

```sql
INSERT INTO pizza (name,  image_url, category, description, price, size)
VALUES ('All Veggies', '/pizza-menu/1.jpg', 'Best sellers', 'Some description', 298, 'Medium 10"');
```
