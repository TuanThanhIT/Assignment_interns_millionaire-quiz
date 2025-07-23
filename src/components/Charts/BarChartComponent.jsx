import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
function BarChartComponent({ data }) {
  return (
    <ResponsiveContainer width="60%" height={300}>
      <BarChart data={data} width={150} height={40}>
        <CartesianGrid strokeLinecap="3 3" />
        <XAxis dataKey="DapAn" tick={{ fill: "#ffffff", fontSize: 16 }} />
        <YAxis tick={{ fill: "#ffffff", fontSize: 16 }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="LuaChon" fill="#b3a8f7" />
      </BarChart>
    </ResponsiveContainer>
  );
}
export default BarChartComponent;
