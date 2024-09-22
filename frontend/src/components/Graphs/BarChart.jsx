import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Register necessary components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = (props) => {
  // Data for the chart
  const data = {
    labels: ["CSE", "IT", "AI", "DS", "IOT"],
    datasets: [
      {
        label: "Placed",
        data: [
          props["CSEplaced"],
          props["ITplaced"],
          props["AIplaced"],
          props["DSplaced"],
          props["IOTplaced"],
        ],
        backgroundColor: "rgba(0, 211, 255, 0.4)",
        borderColor: "rgba(0, 211, 255, 1)",
        borderWidth: 1,
        borderRadius: 5,
      },
      {
        label: "Total",
        data: [
          props["CSEtotal"],
          props["ITtotal"],
          props["AItotal"],
          props["DStotal"],
          props["IOTtotal"],
        ],
        backgroundColor: "rgba(255, 0, 163, 0.4)",
        borderColor: "rgba(255, 0, 163, 1)",
        borderWidth: 1,
        borderRadius: 5,
      },
      {
        label: "Not Placed",
        data: [
          props["CSEnotPlaced"],
          props["ITnotPlaced"],
          props["AInotPlaced"],
          props["DSnotPlaced"],
          props["IOTnotPlaced"],
        ],
        backgroundColor: "rgba(0, 255, 135, 0.4)",
        borderColor: "rgba(0, 255, 135, 1)",
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Students',
        },
      },
    },
  };

  return (
    <div className="card" style={{ borderRadius: "15px" }}>
      <div className="card-body">
        <Bar data={data} options={options} />
        <h5 className="card-title text-center mt-3">Placed vs Not Placed</h5>
      </div>
    </div>
  );
};

export default BarChart;
