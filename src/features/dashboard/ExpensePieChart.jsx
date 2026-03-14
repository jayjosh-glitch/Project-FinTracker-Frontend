import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const COLORS = [
 "#22c55e",
 "#3b82f6",
 "#f59e0b",
 "#ef4444",
 "#8b5cf6",
 "#14b8a6"
];

const ExpensePieChart = ({ expenseCategory }) => {

  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>

        <Pie
          data={expenseCategory}
          dataKey="value"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={110}
          label
        >

          {expenseCategory.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}

        </Pie>

        <Tooltip />
        <Legend />

      </PieChart>
    </ResponsiveContainer>
  );
};

export default ExpensePieChart;