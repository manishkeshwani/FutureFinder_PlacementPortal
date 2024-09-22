import React from "react";
import { Doughnut } from "react-chartjs-2";


const DoughnutChart = (props) => {
  return (
    <div className="card" style={{ borderRadius: "15px" }}>
      <div className="card-body">
        <Doughnut
          data={{
            labels: ["Placed", "Not Placed"],
            datasets: [
              {
                label: `${props.label}`,
                data: [props.placed, props.notPlaced],
                backgroundColor: [
                  "rgba(255, 156, 0, 1)",
                  "rgba(255, 0, 51, 1)"
                ],
              },
            ],
          }}
        />
        <h6 className="card-title text-center mt-3">
          Placed vs Not Placed
        </h6>
        <h5 className="card-title text-center mt-3">
          {props.label} 
        </h5>
      </div>
    </div>
  );
};

export default DoughnutChart;
