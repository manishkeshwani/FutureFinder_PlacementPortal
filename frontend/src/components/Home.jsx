import React from "react";
import { FaYoutube, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import HomeJobCard from "./HomeJobCard";

const Home = () => {
  console.log("Home component loaded");
  return (
    <div className="container mt-4">
      <div className="row mt-5 d-flex  align-content-center justify-content-between">
        <div className="col-md-12 col-sm-12 col-lg-5 d-flex flex-column justify-content-center align-items-start">
          <h3 style={{ fontSize: "3rem", fontWeight: "700" }}>Where Talent</h3>
          <h3 style={{ fontSize: "3rem", fontWeight: "700" }}>
            Meets Opportunity
          </h3>

          <div
            className="mt-3"
            style={{ fontWeight: "500", color: "gray", fontSize: "1.1rem" }}
          >
            FutureFinder helps fresh graduates get their first jobs,
          </div>
          <div style={{ fontWeight: "500", color: "gray", fontSize: "1.1rem" }}>
            enables employers to recruit faster,
          </div>
          <div style={{ fontWeight: "500", color: "gray", fontSize: "1.1rem" }}>
            and helps colleges streamline campus placements
          </div>
          <br />
          <button
            className="btn px-3"
            style={{ backgroundColor: "#e55d1b", borderRadius: "20px" }}
          >
            Get Started
          </button>
        </div>
        <div className="col-md-12 col-sm-12 col-lg-5 d-flex ps-5">
          <div className="col-3 pt-5">
            <img src="home2.jpg" alt="" style={{ width: "12rem" }} />
            <img
              src="home1.jpg"
              alt=""
              style={{ width: "12rem", marginLeft: "30px" }}
            />
          </div>
          <div className="col-3 m-5 pt-5">
            <img src="home3.jpg" alt="" style={{ width: "12rem" }} />
          </div>
        </div>
      </div>

      <hr className="mt-5" />

      <div className="row d-flex justify-content-center align-items-center mt-5 mb-5">
        <div className="col-4 d-flex justify-content-center align-items-center">
          <div className="h5">STUDENTS</div>
        </div>

        <div className="col-8 ">
          <div className="h2">Explore, Apply for job & Succeed</div>
          <p className="mt-3 pe-5" style={{ textAlign: "justify" }}>
            Access real-time updates, company insights, and detailed interview
            experiences. Whether you're a beginner or ready to leap into your
            career, our portal provides all the tools you need to shine in the
            recruitment process.
          </p>
          <p className="mt-3 pe-5" style={{ textAlign: "justify" }}>
            With our portal, every student is empowered to achieve their dream
            job your journey to success begins now!"
          </p>
          <button
            className="btn mt-3"
            style={{ backgroundColor: "#e55d1b", borderRadius: "13px" }}
          >
            For Students
          </button>
        </div>
      </div>

      <hr />

      <div className="row d-flex justify-content-center align-items-center mt-5 mb-5">
        <div className="col-4 d-flex justify-content-center align-items-center">
          <div className="h5">TPO</div>
        </div>

        <div className="col-8 ">
          <div className="h2">Empower the Next Generation</div>
          <p className="mt-3 pe-5" style={{ textAlign: "justify" }}>
            As a Training and Placement Officer, you're at the forefront of
            bridging the gap between students and industry. Our portal equips
            you with the resources to manage recruitment drives, post job
            openings, and provide vital guidance.
          </p>
          <p className="mt-3 pe-5" style={{ textAlign: "justify" }}>
            Facilitate a seamless transition from academia to industry for your
            students and help them embark on successful careers."
          </p>
          <button
            className="btn mt-3"
            style={{ backgroundColor: "#e55d1b", borderRadius: "13px" }}
          >
            For TPO
          </button>
        </div>
      </div>

      <hr />

      <div className="row mt-5 mb-5">
        <div className="col h2">Top Recruiters</div>
      </div>

      <div className="row">
        <HomeJobCard img={"advintek.jpg"} />
        <HomeJobCard img={"afinoz.jpg"} />
        <HomeJobCard img={"appllo.jpg"} />
        <HomeJobCard img={"coforge.jpg"} />
        <HomeJobCard img={"cognizant.jpg"} />
        <HomeJobCard img={"hcl.jpg"} />
        <HomeJobCard img={"infinity.jpg"} />
        <HomeJobCard img={"infosys.jpg"} />
        <HomeJobCard img={"nagarro.jpg"} />
        <HomeJobCard img={"netprophets.jpg"} />
        <HomeJobCard img={"nucleus.jpg"} />
        <HomeJobCard img={"planetcast.jpg"} />
        <HomeJobCard img={"tcs.jpg"} />
        <HomeJobCard img={"techmahindra.jpg"} />
        <HomeJobCard img={"timeswap.jpg"} />
        <HomeJobCard img={"tothenew.jpg"} />
        <HomeJobCard img={"vecto.jpg"} />
        <HomeJobCard img={"gamix.jpg"} />
        <HomeJobCard img={"erasmith.jpg"} />
        <HomeJobCard img={"regalo.jpg"} />
      </div>

      <footer className="text-center mt-4 bg-dark p-5">
        <div className="social-icons d-flex justify-content-center gap-3">
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-danger"
          >
            <FaYoutube size={30} />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-warning"
          >
            <FaInstagram size={30} />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary"
          >
            <FaFacebook size={30} />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-info"
          >
            <FaLinkedin size={30} />
          </a>
        </div>
        <p className="text-muted mt-2">
          &copy; {new Date().getFullYear()} Placement Portal. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
