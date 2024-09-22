import React, { useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Heading from "./Heading";


const JuniorJobDetails = () => {
  const [job, setJob] = useState({});
  const { jobID } = useParams();
  const navigate = useNavigate("");

  const fetchJob = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/fetchSingleJob/${jobID}`
      );
      const result = await response.json();
      if (result) {
        setJob(result);
      } else {
        setModalMsg("No data Available");
        setModalVisibility(true);
      }
    } catch (error) {
      setModalMsg(
        "Internal Server Error, Try After Sometime. Sorry For Inconvenience"
      );
      setModalVisibility(true);
    }
  };
  const handleGoBack=()=>{
    navigate('/juniorJobViewing')
  }

  useEffect(() => {
    fetchJob();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Heading heading={job.companyName} />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <p className="h6">Posted By: {job.adminName}</p>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <p className="h6">Offered CTC: {job.ctc}</p>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <p className="h6">Position: {job.position}</p>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <p className="h6 mt-4">Job Description:</p>
          <p style={{ textAlign: "justify" }}>{job.jobDescription}</p>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <p className="h6 mt-4">Selection Process:</p>
          <p style={{ textAlign: "justify" }}>{job.selectionProcess}</p>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <p className="h6 mt-4">Skills Required:</p>
          <p style={{ textAlign: "justify" }}>{job.skillsRequired}</p>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <p className="h6 mt-4">Additional Offers:</p>
          <p style={{ textAlign: "justify" }}>{job.additionalOffers}</p>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <p className="h6 mt-4">Bond:</p>
          <p style={{ textAlign: "justify" }}>{job.bond}</p>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <p className="h6 mt-4">More About Company:</p>
          <p>
            <a href={job.companyWebsite} target="_blank">
              <button className="btn btn-primary">Click Here</button>
            </a>
          </p>
        </div>
      </div>

      <div className="row text-center">
        <div className="col">
              <button className="btn mt-5 mb-5" style={{backgroundColor:"#e55d1b", color:'wheat'}} onClick={handleGoBack}>
                Go Back
              </button>
        </div>
      </div>
    </div>
  );
};

export default JuniorJobDetails;
