import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Heading from "./Heading";
import FormInput from "./FormInput";
import Modal from "./Modal";

const MoreStudentDetails = () => {
  const { admNum } = useParams();
  const [student, setStudent] = useState(null);
  const [ModalVisibility, setModalVisibility] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  useEffect(() => {
    const fetchStudentDetail = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/fetchStudent/${admNum}`
        );
        const data = await response.json();
        // console.log('Student data:', data); // Debugging step
        setStudent(data);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchStudentDetail();
  }, [admNum]);

  const handleVerifyStudent = async () => {
    try {
      const response = await fetch(`http://localhost:5000/verifyStudent`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentAdmNum: admNum }),
      });

      const result = await response.json();

      if (result) {
        setModalMsg("Student Verified");
      } else {
        setModalMsg("Student Not Verified");
      }

      setModalVisibility(true);
    } catch (error) {
      console.error("An error occurred:", error);
      setModalMsg(
        "Internal Server Error, Try After Sometime. Sorry for inconvenience"
      );
      setModalVisibility(true);
    }
  };

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <Heading heading={"Student Profile"} />

      {/* Personal Details */}
      <h4 className="h4">Personal Information</h4>
      <hr />
      <FormInput
        type={"text"}
        name={"studentName"}
        placeholder={student.studentName}
        isDisabled={true}
        label={"Student Name"}
      />
      <FormInput
        type={"text"}
        name={"studentAdmNum"}
        placeholder={student.studentAdmNum}
        isDisabled={true}
        label={"Admission Number"}
      />
      <FormInput
        type={"email"}
        name={"studentOfficialEmail"}
        placeholder={student.studentOfficialEmail}
        isDisabled={true}
        label={"Official Email"}
      />
      <FormInput
        type={"email"}
        name={"studentPersonalEmail"}
        placeholder={student.studentPersonalEmail}
        isDisabled={true}
        label={"Personal Email"}
      />
      <FormInput
        type={"number"}
        name={"studentContact"}
        placeholder={student.studentContact}
        isDisabled={true}
        label={"Contact"}
      />
      <FormInput
        type={"number"}
        name={"studentDepartment"}
        placeholder={student.studentDepartment}
        isDisabled={true}
        label={"Department"}
      />

      <h4 className="h4 mt-5">Address</h4>
      <hr />
      <FormInput
        type={"text"}
        name={"studentCurrentAddress"}
        placeholder={student.studentCurrentAddress}
        isDisabled={true}
        label={"Student Current Address"}
      />
      <FormInput
        type={"text"}
        name={"studentPermanentAddress"}
        isRequired={true}
        placeholder={student.studentPermanentAddress}
        isDisabled={true}
        label={"Student Permanent Address"}
      />

      <h4 className="h4 mt-5">Educational Information</h4>
      <hr />
      <FormInput
        type={"number"}
        name={"tenthPercentage"}
        placeholder={student.tenthPercentage}
        isDisabled={true}
        label={"10th Percentage"}
      />
      <a
        href={student.tenthMarksheet}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="btn btn-primary mb-3">View 10th Marksheet</button>
      </a>
      <FormInput
        type={"number"}
        name={"twelfthPercentage"}
        isRequired={true}
        placeholder={student.twelfthPercentage}
        isDisabled={true}
        label={"12th Percentage"}
      />
      <a
        href={student.twelfthMarksheet}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="btn btn-primary mb-3">View 12th Marksheet</button>
      </a>
      <FormInput
        type={"number"}
        name={"semOne"}
        placeholder={student.semOne}
        isDisabled={true}
        label={"Semester 1 Marks"}
      />
      <FormInput
        type={"number"}
        name={"semTwo"}
        placeholder={student.semTwo}
        isDisabled={true}
        label={"Semester 2 Marks"}
      />
      <FormInput
        type={"number"}
        name={"semThree"}
        placeholder={student.semThree}
        isDisabled={true}
        label={"Semester 3 Marks"}
      />
      <FormInput
        type={"number"}
        name={"semFour"}
        placeholder={student.semFour}
        isDisabled={true}
        label={"Semester 4 Marks"}
      />
      <FormInput
        type={"number"}
        name={"semFive"}
        placeholder={student.semFive}
        isDisabled={true}
        label={"Semester 5 Marks"}
      />
      <FormInput
        type={"number"}
        name={"semSix"}
        placeholder={student.semSix}
        isDisabled={true}
        label={"Semester 6 Marks"}
      />
      <FormInput
        type={"number"}
        name={"studentBacklog"}
        placeholder={student.studentBacklog}
        isDisabled={true}
        label={"Number of Backlogs"}
      />
      <FormInput
        type={"number"}
        name={"aktuPercentage"}
        placeholder={student.aktuPercentage}
        isDisabled={true}
        label={"AKTU Percentage"}
      />

      <h4 className="h4 mt-5">Skills</h4>
      <hr />
      <div className="row">
        <div className="col">
          <ul className="d-flex flex-wrap gap-3" id="skills">
            {student.skills &&
              student.skills.map((skill, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex align-items-center gap-3"
                  style={{
                    fontWeight: "500",
                    border: "none",
                    borderRadius: "20rem",
                  }}
                >
                  {skill}
                </li>
              ))}
          </ul>
        </div>
      </div>

      <h4 className="h4 mt-5">Resume</h4>
      <hr />
      <a href={student.resume} target="_blank" rel="noopener noreferrer">
        <button className="btn btn-primary mb-3">View Resume</button>
      </a>

      <div className="row mb-3 mt-3">
        <div className="col text-center">
            <button
              type="btn"
              className="btn mt-3 px-3 py-2"
              onClick={handleVerifyStudent}
              style={{
                backgroundColor: "#e55d1b",
                color: "wheat",
                fontWeight: "600",
              }}
            >
              Verify Profile
            </button>
        </div>
      </div>

      <Modal
        visibility={ModalVisibility}
        setModalVisibility={setModalVisibility}
        modalContent={modalMsg}
        NavigationLink={"verifyStudent"}
        modalHeading={"Verification Status"}
      />
    </div>
  );
};

export default MoreStudentDetails;
