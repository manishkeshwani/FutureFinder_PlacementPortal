import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./StudentAuth";


const StudentLogin = () => {
  const studentNavigate = useNavigate();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const {saveData} = useContext(AuthContext)

  const handleStudentLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/Studentlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: mail,
          password: password,
        }),
      });

      let result = await response.json();
      if (result) {
        saveData(result.token,result.admNum)
        // localStorage.setItem("token", result.token);
        // localStorage.setItem("admissionID", result.admNum);
        studentNavigate(`/studentDashboard`);
      } else {
        document.querySelector(".invalidMsg").innerText =
          "Invalid Credentials!! Try Again";
      }
    } catch (error) {
      //modal to show error
    }
  };

  return (
    <div className="studentLogin">
      <div className="studentLoginHeading">
        <h1>Student Login</h1>
      </div>
      <div className="invalidMsg">
        <p></p>
      </div>
      <input
        className="form-control"
        type="email"
        placeholder="Enter email"
        onChange={(e) => {
          setMail(e.target.value);
        }}
        value={mail}
        required
      />
      <input
        className="form-control"
        type="password"
        placeholder="Enter password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
        required
      />

      <div className="d-flex justify-content-center align-items-center m-4">
        <button
          className="btn btn-primary"
          type="submit"
          onClick={handleStudentLogin}
        >
          Login
        </button>

        {/* <div className="line">
          <hr /> or <hr />
        </div> */}

        {/* <button type="submit" onClick={()=>{
            studentNavigate('/studentSignup')
        }}>
            Signup
        </button> */}
      </div>
    </div>
  );
};

export default StudentLogin;
