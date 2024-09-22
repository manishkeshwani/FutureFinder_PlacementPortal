import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./StudentAuth";

const JobCard = (props) => {
    const job = props.job;
    // const [admNum, setAdmNum] = useState("");
    const navigator = useNavigate('');
    const {data} = useContext(AuthContext);


  const getAdmissionID=()=>{
    const admissionID = data.admNum;
    if(admissionID){
    //   setAdmNum(admissionID);
      // console.log(admissionID)
    }
    else{
      navigator('/studentLogin');
    }
  }

    // Function to get the first 100 words
    const getFirst100Words = (text) => {
        if (!text) return '';
        return text.split(" ").slice(0, 40).join(" ") + ' ....';
    };

    const handleApplyBtn = async()=>{
        const admissionID = data.admNum;
        // setAdmNum(admissionID);
        navigator(`/applyJob/${job.jobID}`);
    }

    useEffect(()=>{
        getAdmissionID();
    },[])
    return (
        <div className="col my-3 d-flex justify-content-center">
            <div className="card" style={{ width: "20rem", minWidth: "18rem" ,borderRadius:'20px' }}>
                <img src={job.companyLogo} className="card-img-top" alt="Company Logo" style={{height:'13rem', borderRadius:'20px 20px 0px 0px'}}/>
                <div className="card-body text-center">
                    <h1 className="card-title text-center">{job.companyName}</h1>
                    <p className="card-text mt-4" style={{ textAlign: "justify"}}>
                        Offered CTC: {job.ctc}
                    </p>
                    <p className="card-text" style={{ textAlign: "justify", height:'15rem'}}>
                        {getFirst100Words(job.jobDescription)}
                    </p>
                    <button className="btn btn-primary" onClick={handleApplyBtn}>{props.btnContent}</button>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
