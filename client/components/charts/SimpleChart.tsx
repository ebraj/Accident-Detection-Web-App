"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: `Accident Graph on ${new Date().getFullYear()}/Month`,
    },
  },
};
export const datas = {
  labels,
  datasets: [
    { label: "Dataset 1", backgroundColor: "#219ebc", data: "Data1" },
    { label: "Dataset 2", backgroundColor: "#f4a261", data: "Data2" },
  ],
};

type Props = {};

export function SimpleChart({}: Props) {
  return (
    <div>
      <Bar className="" data={datas} options={options} />
    </div>
  );
}
