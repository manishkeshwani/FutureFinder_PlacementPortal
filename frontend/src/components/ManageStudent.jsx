import React, { useContext, useEffect, useState } from "react";
import Modal from "./Modal";
import { Link, useNavigate } from "react-router-dom";
import { TPOAuthContext } from "./TPOAuth";

const ManageStudent = () => {
  const [students, setStudents] = useState([]);
  const [modalMsg, setModalMsg] = useState("");
  const [placed, setPlaced] = useState({});
  // placed={admNum: jobID}
  const [companies, setCompanies] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [value, setValue] = useState("");
  const {TPOdata} = useContext(TPOAuthContext);
  const navigate = useNavigate('');

  const fetchStudents = async () => {
    const response = await fetch("http://localhost:5000/allStudentFetching");
    const result = await response.json();
    setStudents(result);
  };

  const fetchPlacedCompanies = async () => {
    const response = await fetch(
      `http://localhost:5000/fetchingPlacementStatus`
    );
    const result = await response.json();
    setCompanies(result);
  };

  useEffect(() => {
    if(!TPOdata){
      navigate('/TPOLogin')
    }
    else{
      fetchStudents();
      fetchPlacedCompanies();
    }
  }, [TPOdata])
  const handleStudentRemoval = async (admNum) => {
    try {
      const response = await fetch(
        `http://localhost:5000/removeStudent/${admNum}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      if (result) {
        setModalMsg(`Admission ID: ${admNum} Deleted Successfully`);
        setModalVisibility(true);
        setStudents(
          students.filter((student) => student.studentAdmNum !== admNum)
        );
      } else {
        setModalMsg("Failed To delete");
        setModalVisibility(true);
      }
    } catch (error) {
      setModalMsg(
        "Internal Server Error, Try After Sometime. Sorry for inconvenience"
      );
      setModalVisibility(true);
    }
  };

  const handleStudentPlacement = async (admNum) => {
    try {
      const response = await fetch(
        "http://localhost:5000/updatePlacementStatus",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ studentAdmNum: admNum }),
        }
      );

      const response2 = await fetch(
        "http://localhost:5000/updatePlacementTable",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ placed: placed[admNum], admNum: admNum }),
        }
      );

      // console.log(`{placed:${placed[admNum]},admNum:${admNum}}`)

      const result = await response.json();
      const result2 = await response2.json();
      if (result2) {
        setModalMsg(`Admission ID: ${admNum} Updated Successfully`);
        setModalVisibility(true);
      } else {
        setModalMsg("Failed To Update Placement Status");
        setModalVisibility(true);
      }
    } catch (error) {
      setModalMsg(
        "Internal Server Error, Try After Sometime. Sorry for inconvenience"
      );
      setModalVisibility(true);
    }
  };

  const handlePlacedBtn = async (admNum, jid) => {
    setPlaced((prev) => ({
      ...prev,
      [admNum]: jid,
    }));
    console.log(placed);
  };

  const handleSearchStudents = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:5000/searchStudents/${value}`
    );
    const result = await response.json();
    setStudents(result);
  };

  if(!TPOdata){
    return(<>navigate('/TPOLogin')</>)
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col d-flex align-items-center justify-content-between">
          <h1>Manage Student</h1>
          <form
            className="d-flex"
            role="search"
            onSubmit={handleSearchStudents}
          >
            <input
              className="form-control m-auto my-1"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => {
                setValue(e.target.value);
                if(e.target.value === ""){
                fetchStudents();
                fetchPlacedCompanies();
                }
              }}
              value={value}
            />
            <button className="btn btn-outline-success m-auto" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col">
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered border-dark">
              <thead>
                <tr>
                  <th className="text-center" scope="col" style={{ whiteSpace: "nowrap" }}>
                    Admission ID
                  </th>
                  <th className="text-center" scope="col" style={{ whiteSpace: "nowrap" }}>
                    Roll No.
                  </th>
                  <th className="text-center" scope="col" style={{ whiteSpace: "nowrap" }}>
                    Name
                  </th>
                  <th className="text-center" scope="col" style={{ whiteSpace: "nowrap" }}>
                    Department
                  </th>
                  <th className="text-center" scope="col" style={{ whiteSpace: "nowrap" }}>
                    Email
                  </th>
                  <th className="text-center" scope="col" style={{ whiteSpace: "nowrap" }}>
                    10th %
                  </th>
                  <th className="text-center" scope="col" style={{ whiteSpace: "nowrap" }}>
                    12th %
                  </th>
                  <th className="text-center" scope="col" style={{ whiteSpace: "nowrap" }}>
                    AKTU %
                  </th>
                  <th className="text-center" scope="col" style={{ whiteSpace: "nowrap" }}>
                    Skills
                  </th>
                  <th className="text-center" scope="col" style={{ whiteSpace: "nowrap" }}>
                    Placed
                  </th>
                  <th className="text-center" scope="col" style={{ whiteSpace: "nowrap" }}>
                    Placed Companies
                  </th>
                  <th className="text-center" scope="col" style={{ whiteSpace: "nowrap"}}>
                    Manage
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, idx) => (
                  <tr key={idx}>
                    <th>{student.studentAdmNum}</th>
                    <td>{student.studentRollNo}</td>
                    <td>{student.studentName}</td>
                    <td>{student.studentDepartment}</td>
                    <td>{student.studentOfficialEmail}</td>
                    <td>{student.tenthPercentage}</td>
                    <td>{student.twelfthPercentage}</td>
                    <td>{student.aktuPercentage}</td>
                    <td>
                      <ul>
                        {student.skills.map((skill, skillIdx) => (
                          <li key={skillIdx}>{skill}</li>
                        ))}
                      </ul>
                    </td>
                    <td>{student.placed ? "Placed" : "Not Placed"}</td>
                    <td>
                      {companies
                        .filter(
                          (company) => company.admNum === student.studentAdmNum
                        )
                        .map((company, idx) => (
                          <ul key={idx}>
                            {company.placed.map((jid, jidIdx) => (
                              <li key={jidIdx}>{jid}</li>
                            ))}
                          </ul>
                        ))}
                    </td>
                    <td>
                      <button
                        className="btn btn-primary mb-2 w-100"
                        onClick={() =>
                          handleStudentRemoval(student.studentAdmNum)
                        }
                      >
                        Remove
                      </button>
                      <div>
                        <input
                          name="jobID"
                          className="form-control"
                          required
                          placeholder={"Job ID"}
                          value={placed.admNum}
                          onChange={(e) =>
                            handlePlacedBtn(
                              student.studentAdmNum,
                              e.target.value
                            )
                          }
                        />
                        <button
                          className="btn btn-primary mb-2 w-100"
                          onClick={() =>
                            handleStudentPlacement(student.studentAdmNum)
                          }
                        >
                          Placed
                        </button>
                      </div>
                      <Link to={`/studentDetails/${student.studentAdmNum}`}>
                        <button className="btn btn-primary w-100">
                          Detail
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal
        visibility={modalVisibility}
        setModalVisibility={setModalVisibility}
        onclose={onclose}
        modalHeading={"Review Submitted"}
        modalContent={modalMsg}
        NavigationLink={"manageStudent"}
      />
    </div>
  );
};

export default ManageStudent;
