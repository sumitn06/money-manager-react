import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const CustomPieChart = ({
  data,
  label,
  totalAmount,
  colors,
  showTextAnchor = false,
}) => {
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={85}
            outerRadius={120}
            paddingAngle={0}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>

          <Tooltip
            formatter={(value) => `₹${Number(value).toLocaleString("en-IN")}`}
          />

          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            wrapperStyle={{
              fontSize: "12px",
              paddingTop: "15px",
            }}
          />

          {showTextAnchor && (
            <text
              x="50%"
              y="48%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#666"
              fontSize="13"
            >
              {label}
            </text>
          )}

          {showTextAnchor && (
            <text
              x="50%"
              y="56%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#222"
              fontSize="23"
              fontWeight="600"
            >
              {totalAmount}
            </text>
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;
