import { sql } from "@vercel/postgres";
import { getAllOrders } from "./orders";
import { getUserById } from "./users";

export async function getFilteredSales({ time } = { time: null }) {
  const getQuery = async () => {
    switch (time) {
      case "DAILY":
        return await sql`SELECT * FROM orders 
          WHERE is_completed=true 
            AND DATE(completion_date)::DATE = CURRENT_DATE
          ORDER BY completion_date DESC;
        `;
      case "MONTHLY":
        return await sql`SELECT * FROM orders 
          WHERE is_completed=true 
            AND EXTRACT(MONTH FROM completion_date) = EXTRACT(MONTH FROM CURRENT_DATE) 
            AND EXTRACT(YEAR FROM completion_date) = EXTRACT(YEAR FROM CURRENT_DATE)
          ORDER BY completion_date DESC;
        `;
      case "YEARLY":
        return await sql`SELECT * FROM orders 
          WHERE is_completed=true 
            AND EXTRACT(YEAR FROM completion_date) = EXTRACT(YEAR FROM CURRENT_DATE)
          ORDER BY completion_date DESC;
        `;
      default:
        return await sql`SELECT * FROM orders 
          WHERE is_completed=true
          ORDER BY completion_date DESC;`;
    }
  };

  const { rows: orderRows } = await getQuery();

  if (orderRows.length) {
    const ordersWithItemsAndCustomer = Promise.all(
      orderRows.map(async (order) => {
        const { rows: orderItems } =
          await sql`SELECT * FROM order_items WHERE order_id = ${order.id};`;

        const customer = await getUserById(order.user_id);

        return {
          ...order,
          items: orderItems.length ? orderItems : [],
          customer: customer,
        };
      }),
    );

    return await ordersWithItemsAndCustomer;
  }

  return [];
}

export async function getTotalSales() {
  const orders = await getAllOrders({ payment_status: "paid" });

  return orders.reduce(
    (total, order) => total + parseFloat(order.total_price),
    0,
  );
}

export async function getMonthlySales() {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthlySales = await Promise.all(
    months.map(async (month, index) => {
      const query = `SELECT * FROM orders
        WHERE is_completed = true
        AND (EXTRACT(MONTH FROM completion_date), EXTRACT(YEAR FROM completion_date)) 
        IN (($1, $2));
      `;
      const values = [index + 1, new Date().getFullYear()];

      const { rows } = await sql.query(query, values);

      return {
        name: month,
        total: rows.length
          ? rows.reduce(
              (total, order) => total + parseFloat(order.total_price),
              0,
            )
          : 0,
      };
    }),
  );

  return monthlySales;
}
