import React, { useContext, useEffect } from 'react'
import {useState} from 'react'
import Heading from './Heading';
import { TPOAuthContext } from './TPOAuth';
import { useNavigate } from 'react-router-dom';

const ManageJob = () => {
    const [applicableJobs,setApplicableJobs] = useState([]);
    const [notApplicableJobs,setNotApplicableJobs] = useState([]);
    const {TPOdata} = useContext(TPOAuthContext)
    const navigate = useNavigate('');

    const fecthjobs = async()=>{
        try{
        const response  = await fetch("http://localhost:5000/fetchJobs");
        const result = await response.json();
        if(result){
            const validjobs = result.filter(job => job.isValid);
            setApplicableJobs(validjobs);
            const notValidJobs = result.filter(job => !job.isValid);
            setNotApplicableJobs(notValidJobs);
        }
        }catch(error){
            //modal to show connectivity issue
        }
    } 

    useEffect(()=>{
      if(!TPOdata){
        navigate('/TPOLogin')
      }else{
        fecthjobs();
      }
    },[TPOdata,applicableJobs,notApplicableJobs])

    if(!TPOdata){
      return(<>navigate('/TPOLogin')</>)
    }

    const jobRemoval = async(jobID)=>{
        try{
            const response  = await fetch(`http://localhost:5000/deleteJob/${jobID}`,{
                method:"DELETE"
            });
            const result = await response.json();
            console.log(result);
            if(result){
                //modal to view that job is deleted
            }
            }catch(error){
                //modal to show connectivity issue
            }
    }


    const DisableJob = async(jobID,validity)=>{
        try{
            const response  = await fetch(`http://localhost:5000/jobValidity`,{
                method:"PUT",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({jobID:jobID,isValid:validity})
            });
            const result = await response.json();
            console.log(result);
            if(result){
                // modal to view that job is disabled
            }
            }catch(error){
                //modal to show connectivity issue
            }
    }

  return (
    <div className='container'>
        <Heading heading={"Manage Jobs"}/>


        {/* Applicable Jobs */}
        <div className='h3'>Applicable Jobs</div>

        <div className="row">
        <div className="col">
          
          {applicableJobs.length === 0 ? (
            <div className='h6 mt-3 mb-3'>No Applicable Jobs available at the moment.</div>
          ):(
            <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered border-dark">
              <thead>
                <tr>
                  <th className='text-center' scope="col" style={{ whiteSpace: "nowrap" }}>Job ID</th>
                  <th className='text-center' scope="col" style={{ whiteSpace: "nowrap" }}>Posted By</th>
                  <th className='text-center' scope="col" style={{ whiteSpace: "nowrap" }}>Company Name</th>
                  <th className='text-center' scope="col" style={{ whiteSpace: "nowrap" }}>Position</th>
                  <th className='text-center' scope="col" style={{ whiteSpace: "nowrap" }}>CTC</th>
                  <th className='text-center' scope="col" style={{ whiteSpace: "nowrap" }}>Required Skills</th>
                  <th className='text-center' scope="col" style={{ whiteSpace: "nowrap" }}>Status</th>
                  <th className='text-center' scope="col" style={{ whiteSpace: "nowrap" }}>Manage</th>
                </tr>
              </thead>
              <tbody>
                {applicableJobs.map((job,idx)=>(
                    <tr key={idx}>
                        <th className='text-center'>{job.jobID}</th>
                        <td className='text-center'>{job.adminName}</td>
                        <td className='text-center'>{job.companyName}</td>
                        <td className='text-center'>{job.position}</td>
                        <td className='text-center' style={{ whiteSpace: "nowrap" }}>{job.ctc}</td>
                        <td className='text-center'>{job.skillsRequired}</td>
                        <td className='text-center'>{job.isValid?"Applicable":"Not Applicable"}</td>
                        <td className='text-center'>
                            <button className='btn btn-primary mb-2 w-75' style={{minWidth:'7rem'}} onClick={()=>jobRemoval(job.jobID)}>Remove</button><br/>
                            <button className="btn btn-primary mb-2 w-75" style={{minWidth:'7rem'}}onClick={()=>DisableJob(job.jobID,false)}>Disable Job</button><br/>
                            <button className="btn btn-primary mb-2 w-75" style={{minWidth:'7rem'}}>View Applied Students</button><br/>
                        </td>
                    </tr>
                ))}

              </tbody>
            </table>
          </div>
        )}

        </div>
      </div>








      <div className='h3'>Not Applicable Jobs</div>
        <div className="row">
        <div className="col">

          

          {notApplicableJobs.length === 0 ? (
            <div className="h6 mt-3 mb-4">No Jobs available at the moment.</div>
          ):(
            
            <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered border-dark">
              <thead>
                <tr>
                  <th className='text-center' scope="col" style={{ whiteSpace: "nowrap" }}>Job ID</th>
                  <th className='text-center' scope="col" style={{ whiteSpace: "nowrap" }}>Posted By</th>
                  <th className='text-center' scope="col" style={{ whiteSpace: "nowrap" }}>Company Name</th>
                  <th className='text-center' scope="col" style={{ whiteSpace: "nowrap" }}>Position</th>
                  <th className='text-center' scope="col" style={{ whiteSpace: "nowrap" }}>CTC</th>
                  <th className='text-center' scope="col" style={{ whiteSpace: "nowrap" }}>Required Skills</th>
                  <th className='text-center' scope="col" style={{ whiteSpace: "nowrap" }}>Status</th>
                  <th className='text-center' scope="col" style={{ whiteSpace: "nowrap" }}>Manage</th>
                </tr>
              </thead>
              <tbody>
                {notApplicableJobs.map((job,idx)=>(
                    <tr key={idx}>
                        <th className='text-center'>{job.jobID}</th>
                        <td className='text-center'>{job.adminName}</td>
                        <td className='text-center'>{job.companyName}</td>
                        <td className='text-center'>{job.position}</td>
                        <td className='text-center' style={{ whiteSpace: "nowrap" }}>{job.ctc}</td>
                        <td className='text-center'>{job.skillsRequired}</td>
                        <td className='text-center'>{job.isValid?"Applicable":"Not Applicable"}</td>
                        <td className='text-center'>
                            <button className='btn btn-primary mb-2 w-75' style={{minWidth:'7rem'}} onClick={()=>jobRemoval(job.jobID)}>Remove</button><br/>
                            <button className="btn btn-primary mb-2 w-75" style={{minWidth:'7rem'}}onClick={()=>DisableJob(job.jobID,true)}>Enable Job</button><br/>
                            <button className="btn btn-primary mb-2 w-75" style={{minWidth:'7rem'}}>View Applied Students</button><br/>
                        </td>
                    </tr>
                ))}

              </tbody>
            </table>
          </div>    
        )}
        </div>
    

      </div>




              {/* Not Applicable Jobs */}
        {/* <div className='h3 mt-5'>Not Applicable Jobs</div>
        <div className="row ">
        <div className="col">
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered border-dark">
              <thead>
                <tr>
                  <th className='text-center' scope="col" style={{ whiteSpace: "nowrap" }}>Job ID</th>
                  <th className='text-center' scope="col" style={{ whiteSpace: "nowrap" }}>Posted By</th>
                  <th className='text-center' scope="col" style={{ whiteSpace: "nowrap" }}>Company Name</th>
                  <th className='text-center' scope="col" style={{ whiteSpace: "nowrap" }}>Position</th>
                  <th className='text-center' scope="col" style={{ whiteSpace: "nowrap" }}>CTC</th>
                  <th className='text-center' scope="col" style={{ whiteSpace: "nowrap" }}>Required Skills</th>
                  <th className='text-center' scope="col" style={{ whiteSpace: "nowrap" }}>Status</th>
                  <th className='text-center' scope="col" style={{ whiteSpace: "nowrap" }}>Manage</th>
                </tr>
              </thead>
              <tbody>
                {notApplicableJobs.map((job,idx)=>(
                    <tr key={idx}>
                        <th className='text-center'>{job.jobID}</th>
                        <td className='text-center'>{job.adminName}</td>
                        <td className='text-center'>{job.companyName}</td>
                        <td className='text-center'>{job.position}</td>
                        <td className='text-center'>{job.ctc}</td>
                        <td className='text-center'>{job.skillsRequired}</td>
                        <td className='text-center'>{job.isValid?"Applicable":"Not Applicable"}</td>
                        <td className='text-center'>
                            <button className='btn btn-primary mb-2 w-75' style={{minWidth:'7rem'}} onClick={()=>jobRemoval(job.jobID)}>Remove</button>
                            <button className='btn btn-primary mb-2 w-75' style={{minWidth:'7rem'}} onClick={()=>DisableJob(job.jobID,true)}>Enable Job</button>
                            <button className='btn btn-primary mb-2 w-75' style={{minWidth:'7rem'}}>View Applied Students</button>
                        </td>
                    </tr>
                ))} */}

              {/* </tbody> */}
            {/* </table> */}
          {/* </div> */}
        {/* </div> */}
      {/* </div> */}

    </div>
  )
}

export default ManageJob
