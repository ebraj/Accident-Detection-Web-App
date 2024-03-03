import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Customized,
  Cross,
} from "recharts";

interface DataItem {
  date: string; // Assuming date is a string in the format "YYYY-MM-DD"
  // Add other properties here as needed
}

interface AggregatedData {
  monthYear: string;
  count: number;
}
// Function to aggregate data month-wise
const aggregateDataByMonth = (data: DataItem[]): AggregatedData[] => {
  const monthlyData: { [key: string]: DataItem[] } = {};

  data.forEach((item) => {
    const date = new Date(item.date);
    const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
    if (!monthlyData[monthYear]) {
      monthlyData[monthYear] = [];
    }
    monthlyData[monthYear].push(item);
  });

  // Sort the keys (months) in ascending order
  const sortedMonths = Object.keys(monthlyData).sort();

  // Map over the sorted keys and return the data
  return sortedMonths.map((monthYear) => ({
    monthYear,
    count: monthlyData[monthYear].length,
  }));
};
// const aggregateDataByDay = (data) => {
//   const dailyData = {};
//   data.forEach((item) => {
//     const date = new Date(item.date);
//     const day = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
//     if (!dailyData[day]) {
//       dailyData[day] = 0;
//     }
//     dailyData[day]++;
//   });
//   return Object.entries(dailyData).map(([day, count]) => ({
//     day,
//     count,
//   }));
// };

const CustomizedCross = (props: any) => {
  const { width, height, stroke, fill, formattedGraphicalItems } = props;
  const firstSeries = formattedGraphicalItems[0];
  const secondPoint = firstSeries?.props?.points[1];
  return (
    <Cross
      y={secondPoint?.y}
      x={secondPoint?.x}
      top={5}
      left={50}
      height={height}
      width={width}
      stroke={stroke ?? "#000"}
      fill={fill ?? "none"}
    />
  );
};

const CustomChart = ({ datas }: any) => {
  const final = aggregateDataByMonth(datas);
  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart
        width={500}
        height={300}
        data={final}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        {/* <XAxis dataKey="date" /> */}
        <XAxis dataKey="monthYear" />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* <Line type="monotone" dataKey="severityInPercentage" stroke="#8884d8" /> */}
        <Line type="monotone" dataKey="count" stroke="#8884d8" />
        <Customized component={CustomizedCross} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomChart;
