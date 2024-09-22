import React, { useEffect, useState, useContext } from "react";
import Heading from "./Heading";
import ProfileCard from "./ProfileCard";
import DashboardCard from "./DashboardCard";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./StudentAuth";

const StudentDashboard = () => {
  // console.log("Dashboard");
  const { data } = useContext(AuthContext);
  const [studentDetails, setStudentDetails] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [updateBtnVisibility, setUpdateBtnVisibility] = useState(false);
  const [viewBtnVisibilty, setViewBtnVisibilty] = useState(false);
  const [jobStatus, setJobStatus] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!data) {
      navigate("/studentLogin");
    } else {
      fetchStudentSignupDetails();
      fetchStudentProfileDetails();
      fetchJobStatus();
    }
  }, [data, navigate]);

  const fetchJobStatus = async () => {
    try {
      // console.log( `${data.admNum}`);
      const response = await fetch(
        `http://localhost:5000/fetchingStudentPlacementStatus/${data.admNum}`
      );
      const jobResponse = await fetch(`http://localhost:5000/fetchJobs`);
      const result = await response.json();
      const jobResult = await jobResponse.json();

      if (result) {
        const applied = result.applied.length;
        const placed = result.placed.length;
        setJobStatus((prevData) => ({
          ...prevData,
          applied: applied,
          placed: placed,
        }));
      }

      if (jobResult) {
        let ongoing = jobResult.filter((job) => job.isValid).length;
        setJobStatus((prevData) => ({
          ...prevData,
          ongoing: ongoing,
          total: (prevData.applied || 0) + (prevData.placed || 0) + ongoing,
        }));
      }
    } catch (error) {
      setJobStatus({ applied: 0, placed: 0, ongoing: 0, total: 0 });
    }
  };

  const fetchStudentSignupDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/userDetails/${data.admNum}`
      );
      const result = await response.json();
      if (result) {
        setUserDetails(result);
      }
    } catch (error) {
      // Handle error
    }
  };

  const fetchStudentProfileDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/fetchProfileDetails/${data.admNum}`
      );
      const result = await response.json();
      if (result) {
        setStudentDetails(result);
        if (result.verified) {
          setUpdateBtnVisibility(false);
          setViewBtnVisibilty(true);
        } else {
          setUpdateBtnVisibility(true);
          setViewBtnVisibilty(false);
        }
      } else {
        setStudentDetails({
          profilePicture: "http://localhost:5000/uploads/studentProfile/dp.jpg",
        });
        setUpdateBtnVisibility(true);
        setViewBtnVisibilty(false);
      }
    } catch (error) {
      // Handle error
    }
  };

  if (!data) {
    return <>navigate("/studentLogin")</>;
  }

  return (
    <div className="container">
      {/* Page Heading */}
      <Heading heading={"Student Dashboard"} />

      {/* Profile Card */}
      <ProfileCard
        name={userDetails.name}
        email={userDetails.email}
        contact={userDetails.contact}
        imgPath={studentDetails.profilePicture}
        admNum={userDetails.admNum}
        updateNavigateLink={"/updateStudentProfile"}
        viewNavigateLink={`/viewStudentProfile/${data.admNum}`}
        updateBtnVisibility={updateBtnVisibility}
        viewBtnVisibilty={viewBtnVisibilty}
      />

      {/* Job Status */}
      <Heading heading={"Placement Status"} />
      <div className="row d-flex align-items-center justify-content-center py-3">
        <DashboardCard title={"Applied"} quantity={jobStatus.applied} />
        <DashboardCard title={"Placed"} quantity={jobStatus.placed} />
        <DashboardCard title={"Ongoing"} quantity={jobStatus.ongoing} />
        <DashboardCard title={"Total"} quantity={jobStatus.total} />
      </div>
    </div>
  );
};

export default StudentDashboard;
