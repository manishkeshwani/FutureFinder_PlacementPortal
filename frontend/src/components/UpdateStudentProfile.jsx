import React, { useState, useContext, useEffect } from "react";
import Heading from "./Heading";
import FormInput from "./FormInput";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Modal from "./Modal";
import { AuthContext } from "./StudentAuth";
import { useNavigate } from "react-router-dom";

const UpdateStudentProfile = () => {
  const { data } = useContext(AuthContext);
  const navigate = useNavigate("");
  const [skills, setSkills] = useState([]);
  const [Docs, setDocs] = useState({});
  const [student, setStudent] = useState({});
  const [modalMsg, setModalMsg] = useState("");
  const [ModalVisibility, setModalVisibility] = useState(false);

  const fetchStudentDetails = async () => {
    try {
      console.log(`admission number is ${data.admNum}`);
      const response = await fetch(
        `http://localhost:5000/userDetails/${data.admNum}`
      );
      const result = await response.json();
      console.log(result);
      if (result) {
        setStudent({
          studentAdmNum: result.admNum,
          studentName: result.name,
          studentOfficialEmail: result.email,
          studentRollNo: result.rollNo,
          studentContact: result.contact,
        });
      } else {
        navigate("/studentLogin");
      }
    } catch (error) {
      navigate("/studentLogin");
    }
  };

  useEffect(() => {
    if (!data) {
      navigate("/studentLogin");
    } else {
      fetchStudentDetails();
    }
  }, [data]);

  const handleSkills = (e) => {
    let value = e.target.value;
    if (!skills.includes(value) && value !== "") {
      setSkills([...skills, value]);
    }
  };

  const handleProfileChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setStudent({ ...student, [name]: value });
  };

  const handleDocChange = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];
    setDocs({ ...Docs, [name]: file });
  };

  const handleSkillRemoval = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleStudentProfileSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
  
    for (const key in student) {
      formData.append(key, student[key]);
    }
    formData.append("skills", skills);
    for (const key in Docs) {
      formData.append(key, Docs[key]);
    }
    formData.append("verified", false);
  
    try {
      const response = await fetch("http://localhost:5000/profile", {
        method: "POST",
        body: formData,
      });
  
      const result = await response.text();
      console.log("Response status: ", response.status);
      console.log("Response text: ", result);
  
      if (response.ok) {
        setModalMsg("Thank you For Updating Profile.");
      } else if (result === "Profile Verified") {
        setModalMsg(
          "Profile Verified!!! You Cannot Update Your Profile Once It Is Verified."
        );
      } else {
        setModalMsg(
          "Internal Server Error, Try After Sometime. Sorry for inconvenience."
        );
      }
      setModalVisibility(true);
    } catch (error) {
      console.error("Error:", error);
      setModalMsg(
        "Internal Server Error, Try After Sometime. Sorry for inconvenience."
      );
      setModalVisibility(true);
    }
  };
  

  return (
    <div className="container">
      <Heading heading={"Student Profile"} />

      <form
        className="pb-3 pt-3"
        onSubmit={handleStudentProfileSubmit}
        encType="multipart/form-data"
      >
        {/* Personal Details */}
        <h4 className="h4">Personal Information</h4>
        <hr />
        <FormInput
          type={"text"}
          name={"studentName"}
          isRequired={true}
          value={student.studentName}
          placeholder={student.studentName}
          isDisabled={true}
          label={"Student Name"}
        />
        <FormInput
          type={"text"}
          name={"studentAdmNum"}
          isRequired={true}
          value={student.studentAdmNum}
          placeholder={student.studentAdmNum}
          isDisabled={true}
          label={"Admission Number"}
        />
        <FormInput
          type={"email"}
          name={"studentOfficialEmail"}
          isRequired={true}
          value={student.studentOfficialEmail}
          placeholder={student.studentOfficialEmail}
          isDisabled={true}
          label={"Official Email"}
        />
        <FormInput
          type={"email"}
          name={"studentPersonalEmail"}
          isRequired={true}
          value={student.studentPersonalEmail}
          onChange={handleProfileChange}
          placeholder={""}
          isDisabled={false}
          label={"Personal Email"}
        />
        <FormInput
          type={"number"}
          name={"studentContact"}
          isRequired={true}
          value={student.studentContact}
          placeholder={student.studentContact}
          isDisabled={true}
          label={"Contact"}
        />
        <FormInput
          type={"text"}
          name={"studentDepartment"}
          isRequired={true}
          onChange={handleProfileChange}
          value={student.studentDepartment}
          placeholder={student.studentDepartment}
          isDisabled={false}
          label={"Department"}
          information={"Supports abbreviation (CSE,IT,AI,IOT,DS) in capital case."}
        />

        <FormInput
          type={"file"}
          name={"profilePicture"}
          isRequired={true}
          files={Docs.profilePicture}
          onChange={handleDocChange}
          placeholder={""}
          isDisabled={false}
          label={"Profile Picture"}
          accept={".jpg"}
          information={"Supports only jpg format."}
        />

        <h4 className="h4 mt-5">Address</h4>
        <hr />
        <FormInput
          type={"text"}
          name={"studentCurrentAddress"}
          isRequired={true}
          value={student.studentCurrentAddress}
          onChange={handleProfileChange}
          placeholder={""}
          isDisabled={false}
          label={"Student Current Address"}
        />
        <FormInput
          type={"text"}
          name={"studentPermanentAddress"}
          isRequired={true}
          value={student.studentPermanentAddress}
          onChange={handleProfileChange}
          placeholder={""}
          isDisabled={false}
          label={"Student Permanent Address"}
        />

        <h4 className="h4 mt-5">Educational Information</h4>
        <hr />
        <FormInput
          type={"number"}
          name={"tenthPercentage"}
          isRequired={true}
          value={student.tenthPercentage}
          onChange={handleProfileChange}
          placeholder={""}
          isDisabled={false}
          label={"10th Percentage"}
        />
        <FormInput
          type={"file"}
          name={"tenthMarksheet"}
          isRequired={true}
          files={Docs.tenthMarksheet}
          onChange={handleDocChange}
          placeholder={""}
          isDisabled={false}
          label={"10th Marksheet"}
          accept={".pdf"}
          information={"Supports only pdf format."}
        />
        <FormInput
          type={"number"}
          name={"twelfthPercentage"}
          isRequired={true}
          value={student.twelfthPercentage}
          onChange={handleProfileChange}
          placeholder={""}
          isDisabled={false}
          label={"12th Percentage"}
        />
        <FormInput
          type={"file"}
          name={"twelfthMarksheet"}
          isRequired={true}
          files={Docs.twelfthMarksheet}
          onChange={handleDocChange}
          placeholder={""}
          isDisabled={false}
          label={"12th Marksheet"}
          accept={".pdf"}
          information={"Supports only pdf format."}
        />
        <FormInput
          type={"number"}
          name={"semOne"}
          isRequired={true}
          value={student.semOne}
          onChange={handleProfileChange}
          placeholder={""}
          isDisabled={false}
          label={"Semester 1 Marks"}
        />
        <FormInput
          type={"number"}
          name={"semTwo"}
          isRequired={true}
          value={student.semTwo}
          onChange={handleProfileChange}
          placeholder={""}
          isDisabled={false}
          label={"Semester 2 Marks"}
        />
        <FormInput
          type={"number"}
          name={"semThree"}
          isRequired={true}
          value={student.semThree}
          onChange={handleProfileChange}
          placeholder={""}
          isDisabled={false}
          label={"Semester 3 Marks"}
        />
        <FormInput
          type={"number"}
          name={"semFour"}
          isRequired={true}
          value={student.semFour}
          onChange={handleProfileChange}
          placeholder={""}
          isDisabled={false}
          label={"Semester 4 Marks"}
        />
        <FormInput
          type={"number"}
          name={"semFive"}
          isRequired={true}
          value={student.semFive}
          onChange={handleProfileChange}
          placeholder={""}
          isDisabled={false}
          label={"Semester 5 Marks"}
        />
        <FormInput
          type={"number"}
          name={"semSix"}
          isRequired={true}
          value={student.semSix}
          onChange={handleProfileChange}
          placeholder={""}
          isDisabled={false}
          label={"Semester 6 Marks"}
        />
        <FormInput
          type={"number"}
          name={"studentBacklog"}
          isRequired={true}
          value={student.studentBacklog}
          onChange={handleProfileChange}
          placeholder={""}
          isDisabled={false}
          label={"Number of Backlogs"}
        />
        <FormInput
          type={"number"}
          name={"aktuPercentage"}
          isRequired={true}
          value={student.aktuPercentage}
          onChange={handleProfileChange}
          placeholder={""}
          isDisabled={false}
          label={"AKTU Percentage"}
        />
        <FormInput
          type={"file"}
          name={"aktuResult"}
          isRequired={true}
          files={Docs.aktuResult}
          onChange={handleDocChange}
          placeholder={""}
          isDisabled={false}
          label={"AKTU Oneview Result"}
          accept={".pdf"}
          information={"Supports only pdf format."}
        />

        <h4 className="h4 mt-5">Skills</h4>
        <hr />
        <div className="row">
          <div className="col">
            <ul className="d-flex flex-wrap gap-3" id="skills">
              {skills.map((skill, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex align-items-center gap-3"
                  style={{
                    fontWeight: "500",
                    border: "none",
                    borderRadius: "20rem",
                  }}
                >
                  {skill}{" "}
                  <button
                    type="button"
                    className="btn mb-2 pe-0 p-1"
                    onClick={() => handleSkillRemoval(skill)}
                  >
                    <RiDeleteBin5Fill size={20} color="#e55d1b" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <select
          className="form-select"
          aria-label="Default select example"
          defaultValue=""
          onChange={handleSkills}
          required
        >
          <option value="" disabled>
            Open this to Select Skills
          </option>
          <option value="C++">C++</option>
          <option value="JAVA">Java</option>
          <option value="PYTHON">Python</option>
          <option value="JAVASCRIPT">JavaScript</option>
          <option value="MONGODB">MongoDB</option>
          <option value="MYSQL">MySQL</option>
          <option value="R">R</option>
          <option value="RUBY">Ruby</option>
          <option value="PERL">Perl</option>
          <option value="REACT">React</option>
          <option value="EXPRESSJS">ExpressJS</option>
          <option value="NODEJS">NodeJS</option>
          <option value="HTML">HTML</option>
          <option value="CSS">CSS</option>
          <option value="C">C</option>
          <option value="C#">C#</option>
          <option value="ANGULAR">Angular</option>
          <option value="NEXTJS">NextJS</option>
          <option value="BOOTSTRAP">Bootstrap</option>
        </select>

        <h4 className="h4 mt-5">Resume</h4>
        <hr />
        <FormInput
          type={"file"}
          name={"resume"}
          isRequired={true}
          files={Docs.resume}
          onChange={handleDocChange}
          placeholder={""}
          isDisabled={false}
          label={"Resume"}
          accept={".pdf"}
          information={"Supports only pdf format."}
        />

        <div className="btn">
          <button
            type="submit"
            className="btn mt-3 px-3 py-2"
            style={{
              backgroundColor: "#e55d1b",
              color: "wheat",
              fontWeight: "600",
            }}
          >
            Update Profile
          </button>
        </div>
      </form>

      <Modal
        visibility={ModalVisibility}
        setModalVisibility={setModalVisibility}
        modalContent={modalMsg}
        NavigationLink={"studentDashboard"}
        modalHeading={"Profile Status"}
      />
    </div>
  );
};

export default UpdateStudentProfile;
