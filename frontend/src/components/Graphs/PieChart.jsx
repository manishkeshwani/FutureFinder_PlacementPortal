import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register the required components with Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = (props) => {
  return (
    <div className="card" style={{ borderRadius: "15px" }}>
      <div className="card-body">
        <Pie
          data={{
            labels: ["CSE", "IT", "AI", "DS", "IOT"],
            datasets: [
              {
                label: 'Placed',
                data: [
                  props.CSEplaced,
                  props.ITplaced,
                  props.AIplaced,
                  props.DSplaced,
                  props.IOTplaced
                ],
                backgroundColor: [
                  "rgba(255, 156, 0, 1)",
                  "rgba(200, 255, 0, 1)",
                  "rgba(0, 255, 214, 1)",
                  "rgba(151, 0, 255, 1)",
                  "rgba(255, 0, 131, 1)"
                ],
              },
            ],
          }}
        />
        <h5 className="card-title text-center mt-3">
          Department Wise Placement 
        </h5>
      </div>
    </div>
  );
}

export default PieChart;
