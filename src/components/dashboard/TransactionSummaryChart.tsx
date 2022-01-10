import { Bar } from "react-chartjs-2";
import { useGetUserTransactionsSummary } from "../../hooks/queries/mono";
import { useState } from "react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const TransactionSummaryChart = () => {
  const [labels, setLabels] = useState([]);
  const [amounts, setAmounts] = useState([]);

  useGetUserTransactionsSummary({
    onSuccess: (res) => {
      setAmounts(res.data?.map((d: any) => d.amount));
      setLabels(res.data?.map((d: any) => d.date));
    },
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Amount spent",
        data: amounts,
        fill: true,
        backgroundColor: "#9DC8FF",
        hoverBackgroundColor: "#157AFF",
        borderColor: "#0066FF",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          display: false, //this will remove only the label
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          display: false, //this will remove only the label
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: "left" as const,
        display: false,
      },
      title: {
        display: true,
      },
    },
  };

  return (
    <div className="w-full mb-14">
      <Bar height={80} options={options} data={data} />
    </div>
  );
};
