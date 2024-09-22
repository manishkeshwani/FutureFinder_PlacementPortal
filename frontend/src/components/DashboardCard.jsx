import React from "react";

const DashboardCard = (props) => {
  return (
    <div className="col-5 m-2">
      <div
        className="card"
        style={{
          borderRadius: "20px",
          backgroundColor: "#e55d1b",
          color: "wheat",
        }}
      >
        <div className="card-body d-flex flex-column justify-content-center align-items-center">
          <h4 className="card-title text-center">{props.title}</h4>
          <h4 className="card-content text-center">{props.quantity}</h4>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
