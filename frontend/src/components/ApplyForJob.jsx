import React, { useEffect, useState, useContext} from "react";
import { AuthContext } from "./StudentAuth";
import { useNavigate, useParams } from "react-router-dom";
import Heading from "./Heading";
import JobApplyModal from "./JobApplyModal";
import Modal from "./Modal";

const ApplyForJob = () => {

  const [job, setJob] = useState({});
  const [modalVisibility, setModalVisibility] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modal2Visibility, setModal2Visibility] = useState(false);
  const [modal2Msg, setModal2Msg] = useState("");
  const [appliedStatus, setAppliedStatus] = useState(false);
  const { jobID } = useParams();
  const {data} = useContext(AuthContext);
  const navigate = useNavigate('')

  useEffect(()=>{
    if(!data){
      navigate('/studentLogin');
    }
  },[data])
  

  const fetchAppliedDetails = async () => {
    try {
      // console.log(jobID);
      // console.log(admNum);
      
      const response = await fetch(
        `http://localhost:5000/fetchAppliedStatus/${jobID}/${data.admNum}`
      );
      const result = await response.json();
      setAppliedStatus(result);
      console.log(appliedStatus);
    } catch (error) {
      setModalMsg(
        "Internal Server Error, Try After Sometime. Sorry For Inconvenience"
      );
      setModalVisibility(true);
    }
  };

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


  const fetchStudentDetails = async () => {
    try {
      
      const response = await fetch(
        `http://localhost:5000/fetchSingleStudentDetail/${data.admNum}`
      );
      const result = await response.json();
      if(!result){
        setModal2Msg(
          "Update Profile First, Only then you can apply for jobs"
        );
        setModal2Visibility(true);        
      }
    } catch (error) {
      setModal2Msg(
        "Internal Server Error, Try After Sometime. Sorry For Inconvenience"
      );
      setModal2Visibility(true);
    }
  };

  useEffect(() => {
    if(data){
      fetchJob();
      fetchAppliedDetails();
      fetchStudentDetails();
    }
  }, []);

  const handleApplyBtn = () => {
    setModalMsg("Have You Applied for the job?");
    setModalVisibility(true);
  };
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

      {job.isValid ? (
        !appliedStatus ? (
          <div className="row">
            <div className="col">
              <p className="h6 mt-4">Apply:</p>
              <p>
                <a href={job.applyLink} target="_blank">
                  <button className="btn btn-primary" onClick={handleApplyBtn}>
                    Click Here
                  </button>
                </a>
              </p>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col">
              <p className="h6 mt-4">Already Applied For This Job!!!</p>
            </div>
          </div>
        )
      ) : (
        <div className="row">
          <div className="col">
            <p className="h6 mt-4">Sorry, This job is closed!!!</p>
          </div>
        </div>
      )}

      <JobApplyModal
        visibility={modalVisibility}
        NavigationLink={`studentDashboard`}
        content={modalMsg}
        setModalVisibility={setModalVisibility}
        jobid={jobID}
        admNum={data.admNum}
      />


      <Modal
        visibility={modal2Visibility}
        setModalVisibility={setModal2Visibility}
        modalHeading={"Profile Update"}
        modalContent={modal2Msg}
        NavigationLink={`studentDashboard`}
      />

    </div>
  );
};

export default ApplyForJob;
