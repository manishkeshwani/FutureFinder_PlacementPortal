import React, { useState, useEffect } from "react";
import Heading from "./Heading";
import JobCard from "./JobCard";
import { Link, useNavigate } from "react-router-dom";

const ViewReviews = () => {
  const [uniqueReview, setUniqueReview] = useState([]);
  
  const [modalMsg, setModalMsg] = useState("");
  const [modalVisibility, setModalVisibility] = useState(false);
  const navigator = useNavigate("");

  const fetchReviews = async () => {
    try {
      const response = await fetch("http://localhost:5000/viewReviews");
      const reviewData = await response.json();
      if (reviewData) {
        //code to extract unique companies
        const uniqueCompanyReview = [];
        const CompanySet = new Set();

        reviewData.forEach((review) => {
          if (!CompanySet.has(review.companyName)) {
            CompanySet.add(review.companyName);
            uniqueCompanyReview.push(review);
          }
        });
        console.log(uniqueCompanyReview);
        setUniqueReview(uniqueCompanyReview);
      } else {
        //modal to show error
      }
    } catch (error) {
      setModalMsg("Internal Server Error");
      setModalVisibility(true);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Heading heading={"Reviews"} />
        </div>
      </div>

      <div className="row">
        {uniqueReview.map((review, idx) => (
          <div
            className="col my-3 d-flex justify-content-center hover"
            style={{ cursor: "pointer" }}
            key={idx}
          >
            <div
              className="card"
              style={{
                width: "20rem",
                minWidth: "18rem",
                borderRadius: "20px",
              }}
            >
              <Link
                to={`/viewReviews/${review.companyName}`}
                style={{ textDecoration: "none" }}
              >
                <img
                  src="../../public/review.jpeg"
                  className="card-img-top"
                  alt="Review"
                  style={{ height: "13rem", borderRadius: "20px 20px 0 0" }}
                />
                <div className="card-body text-center">
                  <h3 className="card-title text-center">
                    {review.companyName.toUpperCase()}
                  </h3>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewReviews;
