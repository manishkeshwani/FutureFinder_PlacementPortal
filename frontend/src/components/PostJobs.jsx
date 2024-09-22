import React, { useContext, useEffect, useState } from 'react';
import FormInput from './FormInput';
import FormTextArea from './FormTextArea';
import SubmitButton from './SubmitButton';
import Modal from './Modal';
import { TPOAuthContext } from './TPOAuth';
import { useNavigate } from 'react-router-dom';

const PostJobs = () => {
    const [job, setJob] = useState({companyLogo:""});
    const [jobLogo, setJobLogo] = useState(null); // Change initial value to `null` for file input
    const [TPODetails, setTPODetails] = useState({});
    const [modalMsg, setModalMsg] = useState("");
    const [modalVisibility, setModalVisibility] = useState(false);
    const {TPOdata} = useContext(TPOAuthContext);
    const navigate = useNavigate('')

    const onclose = () => {
        setModalVisibility(false);
    };
    let jobID;

    const fetchTPODetails = async () => {
        try {
          const response = await fetch(`http://localhost:5000/fetchingTPODetails/${TPOdata.adminID}`);
          const result = await response.json();
      
          if (result) {
            console.log(" data found.");
            setTPODetails(result);
          } else {
            console.log("No data found.");
            // navigate('/TPOLogin');
          }
        } catch (error) {
          console.error("Error fetching TPO details:", error);
          navigate('/TPOLogin');
        }
      };

    const fetchJobID = async () => {
        try {
            const response = await fetch("http://localhost:5000/IdFetcher/jobID");
            jobID = await response.json();
            console.log('Fetched Job ID:', jobID.jobID);
            const newJobId = "JID" + `${jobID.jobID + 1}`;
            console.log(newJobId);
            setJob(prevJob => ({ ...prevJob, jobID: newJobId }));
        } catch (error) {
            console.error('Error fetching job ID:', error);
        }
    };

    useEffect(() => {
        if(!TPOdata){
            navigate('/TPOLogin');
        }else{
            fetchJobID();
            fetchTPODetails();
        }
    }, [TPOdata]);

    const handleJobInput = (e) => {
        const name = e.target.name;
        const val = e.target.value;
        setJob(prevJob => ({ ...prevJob, [name]: val }));
    };
    

    const handleLogoInput = (e) => {
        const file = e.target.files[0];
        setJobLogo(file);
    };

    const handleJobPost = async (e) => {
        e.preventDefault();

        let formData = new FormData();
        for (const key in job) {
            formData.append(key, job[key]);
        }

        if (jobLogo) {
            formData.append("companyLogo", jobLogo);
        }

        formData.append("adminID", TPODetails.adminID);
        formData.append("adminName", TPODetails.tpoName);

        try {
            const jobPostResponse = await fetch("http://localhost:5000/postJobs", {
                method: "POST",
                body: formData
            });

            const result = await jobPostResponse.text();
            //if job successfully posted then we update the jobID
            if (result === "Job Posted") {


                
                const updateIdResponse = await fetch("http://localhost:5000/updateID", {
                    method: "PUT",
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({ jobID: job.jobID})
                });

                if(updateIdResponse){
                    console.log("ID updated");
                }
                else{
                    console.log("ID not updated")
                }

                setModalMsg("Job Posted");
                setModalVisibility(true); // Corrected from setVisibility to setModalVisibility
            } else {
                setModalMsg("Job Not Posted");
                setModalVisibility(true); // Corrected from setVisibility to setModalVisibility
            }
        } catch (error) {
            setModalMsg("Internal Server Error!!! Try After Sometime, Sorry for inconvenience");
            setModalVisibility(true); // Corrected from setVisibility to setModalVisibility
            console.error('Error posting job:', error);
        }
    };

    if(!TPOdata){
        return(<>navigate('/TPOLogin')</>)
    }

    return (
        <div className='container'>
            <h1>Post Jobs</h1>
            <div className="row">
                <form onSubmit={handleJobPost} encType='multipart/form-data'>
                    <div className="form-text">Post job here and let the student apply for the same.</div>

                    <FormInput 
                        name={"jobID"} 
                        label={"Job ID"}
                        type={"text"} 
                        placeholder={job.jobID || ''} 
                        isRequired={true}
                        isDisabled={true}
                    />

                    <FormInput 
                        name={"adminID"} 
                        label={"Admin ID"}
                        type={"text"} 
                        placeholder={TPODetails.adminID} 
                        isRequired={true}
                        isDisabled={true}
                    />

                    <FormInput 
                        name={"adminName"} 
                        label={"Admin Name"}
                        type={"text"} 
                        placeholder={TPODetails.tpoName}
                        isRequired={true}
                        isDisabled={true}
                    />

                    <FormInput 
                        name={"companyName"} 
                        label={"Company Name"}
                        type={"text"} 
                        value={job.companyName || ''} 
                        onChange={handleJobInput} 
                        isRequired={true}
                    />

                    <FormInput 
                        name={"companyLogo"} 
                        label={"Company Logo"}
                        type={"file"}  
                        onChange={handleLogoInput} 
                        isRequired={true}
                        accept={".jpg"}
                        information={'Supports only jpg format.'}
                    />
                    {/* <div className="form-text mb-3 mt-0">Supports only jpg format.</div> */}

                    <FormTextArea 
                        name={"jobDescription"} 
                        label={"Job Description"} 
                        value={job.jobDescription || ''} 
                        onChange={handleJobInput} 
                        isRequired={true}
                    />

                    <FormInput 
                        name={"ctc"} 
                        label={"CTC"} 
                        type={"text"} 
                        value={job.ctc || ''} 
                        onChange={handleJobInput} 
                        isRequired={true}
                    />

                    <FormTextArea 
                        name={"skillsRequired"} 
                        label={"Skills Required"} 
                        value={job.skillsRequired || ''} 
                        onChange={handleJobInput} 
                        isRequired={true}
                    />


                    <FormTextArea 
                        name={"selectionProcess"} 
                        label={"Selection Process"}
                        value={job.selectionProcess || ''} 
                        onChange={handleJobInput} 
                        isRequired={true}
                    />

                    <FormInput 
                        name={"position"} 
                        label={"Position"}
                        type={"text"}  
                        value={job.position || ''} 
                        onChange={handleJobInput} 
                        isRequired={true}
                    />

                    <FormInput 
                        name={"additionalOffers"} 
                        label={"Additional Offers"}
                        type={"text"}  
                        value={job.additionalOffers || ''} 
                        onChange={handleJobInput} 
                        isRequired={true}
                    />

                    <FormInput 
                        name={"bond"} 
                        label={"Bond"} 
                        type={"text"} 
                        value={job.bond || ''} 
                        onChange={handleJobInput} 
                        isRequired={true}
                    />

                    <FormInput 
                        name={"companyWebsite"} 
                        label={"Company Website"}
                        type={"text"}  
                        value={job.companyWebsite || ''} 
                        onChange={handleJobInput} 
                        isRequired={true}
                    />

                    <FormInput 
                        name={"applyLink"} 
                        label={"Apply Link"} 
                        type={"text"} 
                        value={job.applyLink || ''} 
                        onChange={handleJobInput} 
                        isRequired={true}
                    />

                    <SubmitButton/>
                </form>
            </div>

            <Modal 
                visibility={modalVisibility} 
                setModalVisibility={setModalVisibility} 
                modalHeading={"Job Posting Status"} 
                modalContent={modalMsg} 
                NavigationLink={"TPODashboard"}
            />
        </div>
    );
};

export default PostJobs;
