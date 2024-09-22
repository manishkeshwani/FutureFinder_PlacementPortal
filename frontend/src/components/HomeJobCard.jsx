import React from "react";

const HomeJobCard = (props) => {
  return (
    <div className="col m-auto mt-3">
      <img src={props.img} alt="" style={{ width: "12rem" , borderRadius:'15px'}} />
    </div>
  );
};

export default HomeJobCard;
