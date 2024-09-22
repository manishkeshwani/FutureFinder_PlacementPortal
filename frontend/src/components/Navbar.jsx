import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./StudentAuth";
import { TPOAuthContext } from "./TPOAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const { data, deleteData } = useContext(AuthContext);
  const {TPOdata,deleteTPOData} = useContext(TPOAuthContext);

  const handleLogout = () => {
    deleteData();
    navigate("/studentLogin");
  };

  const handleTPOLogout = () => {
    deleteTPOData();
    navigate("/TPOLogin");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar-bg">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="/logo.png" alt="Logo" style={{ width: "5rem" }} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav" style={{marginLeft:'auto',marginRight:'5rem'}}>
            
    
            {/* Junior Wing */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="juniorWingDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Junior Wing
              </Link>
              <ul className="dropdown-menu" aria-labelledby="juniorWingDropdown">
                <li><Link className="dropdown-item" to="/juniorJobViewing">View Jobs</Link></li>
                <li><Link className="dropdown-item" to="/viewReviews">View Reviews</Link></li>
                <li><Link className="dropdown-item" to="/viewStories">View Stories</Link></li>
              </ul>
            </li>

            {/* Senior Wing */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="seniorWingDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Senior Wing
              </Link>
              <ul className="dropdown-menu" aria-labelledby="seniorWingDropdown">
                {data === null ? (
                  <>
                    <li><Link className="dropdown-item" to="/studentLogin">Login</Link></li>
                    <li><Link className="dropdown-item" to="/studentSignup">Signup</Link></li>
                  </>
                ) : (
                  <>
                    <li><Link className="dropdown-item" to="/studentDashboard">Dashboard</Link></li>
                    <li><Link className="dropdown-item" to="/viewJobs">View Jobs</Link></li>
                    <li><Link className="dropdown-item" to="/postReviews">Post Reviews</Link></li>
                    <li><Link className="dropdown-item" to="/viewNotices">View Notices</Link></li>
                    <li><Link className="dropdown-item" to="/studentLogin" onClick={handleLogout}>Logout</Link></li>
                  </>
                )}
              </ul>
            </li>

            {/* Departmental Portal */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="departmentDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Department
              </Link>
              <ul className="dropdown-menu" aria-labelledby="departmentDropdown">
                <li><Link className="dropdown-item" to="/coordinatorSignup">Signup</Link></li>
                <li><Link className="dropdown-item" to="/coordinatorDashboard">Dashboard</Link></li>
                <li><Link className="dropdown-item" to="/viewStudents">View Students</Link></li>
                <li><Link className="dropdown-item" to="/coordinatorViewJobs">View Jobs</Link></li>
                <li><Link className="dropdown-item" to="/coordinatorAnalysis">Analyse</Link></li>
              </ul>
            </li>

            {/* Admin */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="adminDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                TPO
              </Link>
              <ul className="dropdown-menu" aria-labelledby="adminDropdown">
                {TPOdata === null ? (
                  <li><Link className="dropdown-item" to="/TPOLogin">Login</Link></li>
                ) : (
                  <>
                  <li><Link className="dropdown-item" to="/TPODashboard">Dashboard</Link></li>
                  <li><Link className="dropdown-item" to="/manageStudent">Manage Students</Link></li>
                  <li><Link className="dropdown-item" to="/manageJobs">Manage Jobs</Link></li>
                  <li><Link className="dropdown-item" to="/verifyStudent">Verify Students</Link></li>
                  <li><Link className="dropdown-item" to="/verifyReviews">Verify Reviews</Link></li>
                  <li><Link className="dropdown-item" to="/postJobs">Post Jobs</Link></li>
                  <li><Link className="dropdown-item" to="/postNotice">Post Notices</Link></li>
                  <li><Link className="dropdown-item" to="/postStories">Post Stories</Link></li>
                  <li><Link className="dropdown-item" to="/Analysis">Analyse</Link></li>
                  <li><Link className="dropdown-item" to="/TPOLogin" onClick={handleTPOLogout}>Logout</Link></li>
                  </>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
