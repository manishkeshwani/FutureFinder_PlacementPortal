import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JobCard from "./JobCard";
import Heading from "./Heading";
import Modal from "./Modal";
import JuniorJobCard from "./JuniorJobCard"

const JuniorJobViewing = () => {
  const [validJobs, setValidJobs] = useState([]);
  const [notValidJobs, setNotValidJobs] = useState([]);
  const [value, setValue] = useState("");
  const [modalMsg, setModalMsg] = useState("");
  const [modalVisibility, setModalVisibility] = useState(false);

  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:5000/viewJobs");
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const jobData = await response.json();
      console.log(jobData);
      setValidJobs(jobData.filter((job) => job.isValid));
      setNotValidJobs(jobData.filter((job) => !job.isValid));
    } catch (error) {
      setModalMsg("Internal Server Error");
      setModalVisibility(true);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleJobSearch = async (e) => {
    e.preventDefault();
    if (value === "") {
      fetchJobs();
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/searchJob/${value}`);
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const result = await response.json();
      setValidJobs(result.filter((job) => job.isValid));
      setNotValidJobs(result.filter((job) => !job.isValid));
    } catch (error) {
      setModalMsg("Internal Server Error");
      setModalVisibility(true);
    }
  };

  const handleOnChange = (e) => {
    setValue(e.target.value);
    if (e.target.value === "") {
      fetchJobs();
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div
          className="col d-flex align-items-center justify-content-between"
          id="jobsFilter"
        >
          <Heading heading={"Find Jobs"} />
          <form className="d-flex" role="search" onSubmit={handleJobSearch}>
            <input
              className="form-control m-auto my-1"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={value}
              onChange={handleOnChange}
            />
            <button className="btn btn-outline-success m-auto" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>

      <div
        className="row mt-5 d-flex justify-content-center"
        id="jobsContainer"
      >
        <div className="h4">On Going</div>

        {validJobs.length === 0 ? (
          <div className="h6">No Jobs Found</div>
        ) : (
          validJobs.map((job, idx) => (
            <JuniorJobCard key={idx} job={job} btnContent={"View Details"} />
          ))
        )}
      </div>

      <div
        className="row mt-5 d-flex justify-content-center"
        id="jobsContainer"
      >
        <div className="h4">Recent</div>

        {notValidJobs.length === 0 ? (
          <div className="h6">No Jobs Found</div>
        ) : (
          notValidJobs.map((job, idx) => (
            <JuniorJobCard key={idx} job={job} btnContent={"View Details"} />
          ))
        )}
      </div>

      <Modal
        visibility={modalVisibility}
        setModalVisibility={setModalVisibility}
        modalHeading={"Jobs Status"}
        modalContent={modalMsg}
        NavigationLink={""}
      />
    </div>
  );
};

export default JuniorJobViewing;
