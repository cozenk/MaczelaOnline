"use client";

import { formatPrice } from "@utils/formatters";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const chartColors = [
  "#3498db", // Light Blue
  "#2980b9", // Dark Blue
  "#2ecc71", // Light Green
  "#27ae60", // Dark Green
  "#e67e22", // Light Orange
  "#d35400", // Dark Orange
  "#9b59b6", // Light Purple
  "#8e44ad", // Dark Purple
  "#e74c3c", // Light Red
  "#c0392b", // Dark Red
  "#f1c40f", // Light Yellow
  "#f39c12", // Dark Yellow
];

export function Chart({ chartData = [] }) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) =>
            formatPrice(value, { withoutDecimals: true })
          }
        />
        <Bar dataKey="total" fill="#3498db" radius={[4, 4, 0, 0]}>
          {chartData.map((data, index) => (
            <Cell key={`cell-${index}`} fill={chartColors[index % 20]} />
          ))}
          <Cell />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
