import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./StudentAuth";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const PostReviews = () => {
//   const [studentDetails, setStudentDetails] = useState({});
const {data} = useContext(AuthContext);
const navigate = useNavigate();

useEffect(()=>{
  if(!data){
    navigate('/studentLogin');
  }
  else{
    fetchStudentDetails();
  }
},[data]);

  const [reviews, setReviews] = useState({
    studentName: "",
    admNum: "",
    studentDepartment: "",
    companyName: "",
    ctc: "",
    selectionProcess: "",
    suggestionsForJuniors: "",
    resourcesForJuniors: "",
    review: "",
    placed: false,
    reviewVerified: false,
  });
  const [modalVisibility, setModalVisibility] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  const fetchStudentDetails = async () => {
    try {
      const admissionID = data.admNum;
      if (admissionID) {
        const response = await fetch(
          `http://localhost:5000/userDetails/${admissionID}`
        );
        const result = await response.json();
        if (result) {
          setReviews({
            ...reviews,
            studentName: result.name,
            admNum: result.admNum,
          });
        } else {
          setModalMsg("Error fetching profile details.");
          setModalVisibility(true);
        }
      } else {
        navigate("/studentLogin");
      }
    } catch (error) {
      setModalMsg("Error fetching profile details.");
      setModalVisibility(true);
    }
  };

  // useEffect(() => {
  //   fetchStudentDetails();
  // }, []);

  const handleReviewChange = (e) => {
    const { name, value, type, checked } = e.target;
    setReviews((data) => ({
      ...data,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/postReviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviews),
      });

      if (response) {
        setModalMsg("Thank you for your valuable feedback!");
        setModalVisibility(true);
      } else {
        setModalMsg("Failed to post review.");
        setModalVisibility(true);
      }
    } catch (error) {
      setModalMsg("Internal Server Error. Please try again later.");
      setModalVisibility(true);
    }
  };

  if(!data){
    return <>navigate('/studentLogin')</>
  }

  return (
    <div className="container">
      <h1>Post Reviews</h1>
      <div className="row">
        <form onSubmit={handleReviewSubmit}>
          <div className="form-text">
            Your honesty will build someone's future.
          </div>

          <div className="mb-3">
            <label htmlFor="studentName" className="form-label">
              Student Name
            </label>
            <input
              name="studentName"
              className="form-control"
              value={reviews.studentName}
              disabled
            />
          </div>

          <div className="mb-3">
            <label htmlFor="admNum" className="form-label">
              Admission Number
            </label>
            <input
              name="admNum"
              className="form-control"
              value={reviews.admNum}
              disabled
            />
          </div>

          <div className="mb-3">
            <label htmlFor="studentDepartment" className="form-label">
              Department
            </label>
            <input
              name="studentDepartment"
              type="text"
              className="form-control"
              value={reviews.studentDepartment}
              onChange={handleReviewChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="companyName" className="form-label">
              Company Name
            </label>
            <input
              name="companyName"
              type="text"
              className="form-control"
              value={reviews.companyName}
              onChange={handleReviewChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="ctc" className="form-label">
              Offered CTC
            </label>
            <input
              name="ctc"
              type="text"
              className="form-control"
              value={reviews.ctc}
              onChange={handleReviewChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="selectionProcess" className="form-label">
              Selection Process
            </label>
            <textarea
              name="selectionProcess"
              className="form-control"
              value={reviews.selectionProcess}
              onChange={handleReviewChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="suggestionsForJuniors" className="form-label">
              Suggestions For Juniors
            </label>
            <textarea
              name="suggestionsForJuniors"
              className="form-control"
              value={reviews.suggestionsForJuniors}
              onChange={handleReviewChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="resourcesForJuniors" className="form-label">
              Resources For Juniors
            </label>
            <textarea
              name="resourcesForJuniors"
              className="form-control"
              value={reviews.resourcesForJuniors}
              onChange={handleReviewChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="review" className="form-label">
              Reviews
            </label>
            <textarea
              name="review"
              className="form-control"
              value={reviews.review}
              onChange={handleReviewChange}
            />
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="placed"
              name="placed"
              checked={reviews.placed}
              onChange={handleReviewChange}
            />
            <label className="form-check-label" htmlFor="placed">
              Check if placed
            </label>
          </div>

          <button type="submit" className="btn btn-primary mb-2">
            Submit
          </button>
        </form>
      </div>
      <Modal
        visibility={modalVisibility}
        setModalVisibility={setModalVisibility}
        modalHeading={"Review Status"}
        modalContent={modalMsg}
        NavigationLink={`studentDashboard`}
      />
    </div>
  );
};

export default PostReviews;
