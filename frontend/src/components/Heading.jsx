import React from "react";

const Heading = (props) => {
  return (
    <div className="row">
      <div className="col-12 text-start mt-3 mb-3">
        <h1 className="h1" style={{ color: "#e55d1b", fontWeight: 600 }}>
          {props.heading}
        </h1>
      </div>
    </div>
  );
};

export default Heading;
