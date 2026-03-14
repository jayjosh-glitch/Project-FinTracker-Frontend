import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const MonthlyFinanceChart = ({ monthlyData }) => {

  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart data={monthlyData} barGap={8}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />

        <XAxis
          dataKey="month"
          tick={{ fontSize: 13 }}
        />

        <YAxis
          tick={{ fontSize: 13 }}
        />

        <Tooltip />

        <Legend
          wrapperStyle={{ paddingTop: 10 }}
        />

        <Bar
          dataKey="income"
          fill="#22c55e"
          radius={[6,6,0,0]}
        />

        <Bar
          dataKey="expense"
          fill="#ef4444"
          radius={[6,6,0,0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyFinanceChart;