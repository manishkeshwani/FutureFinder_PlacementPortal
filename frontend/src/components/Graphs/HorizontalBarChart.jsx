import React from "react";
import { Bar } from "react-chartjs-2";

const HorizontalBarChart = (props) => {
  return (
    <div className="card" style={{ borderRadius: "15px" }}>
      <div className="card-body">
        <Bar
          data={{
            labels: ["CSE", "IT", "AI", "DS", "IOT"],
            datasets: [
              {
                label: "Total",
                data: [
                  props.CSEtotal,
                  props.ITtotal,
                  props.AItotal,
                  props.DStotal,
                  props.IOTtotal,
                ],
                backgroundColor: ["rgba(124, 0, 255, 0.4)"],
                borderRadius:'5',
                borderWidth:'1',
                borderColor:"rgba(124, 0, 255, 1)"
              },
            ],
          }}
          options={{
            indexAxis: "y", 
            scales: {
              x: {
                beginAtZero: true,
              },
            },
          }}
        />
        <h5 className="card-title text-center mt-3">Total Student</h5>
      </div>
    </div>
  );
};

export default HorizontalBarChart;
