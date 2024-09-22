import React from 'react'
import VerificationBtn from './VerificationBtn'

const StudentVerificationCard = (props) => {
  return (
    <div
      className="row py-4 mt-5 d-flex justify-content-center"
      style={{ backgroundColor: "#e55d1b", borderRadius: "30px" }}
    >
      <div className="col-12 col-md-5 col-lg-4 text-center mb-3">
        <img
          src={props.imgPath}
          className="card-img-top"
          alt="Profile Picture"
          style={{ width: "15rem", height: "15rem", borderRadius: "50%" }}
        />
      </div>
      <div
        className="col-12 col-md-7 col-lg-5 d-flex flex-column align-items-center align-items-md-start justify-content-center"
        style={{ color: "wheat", fontWeight: 600 }}
      >
        <h2 style={{ fontWeight: 600 }}>{props.name}</h2>
        <span>Email: {props.email}</span>
        <span>Contact: {props.contact}</span>
        <span>Admission Number: {props.admNum}</span>
        <VerificationBtn navigateLink={props.navigateLink}/>
      </div>
    </div>
  )
}

export default StudentVerificationCard
