import React, { useContext, useEffect, useState } from 'react';
import StudentVerificationCard from './StudentVerificationCard';
import Modal from './Modal';
import { TPOAuthContext } from './TPOAuth';
import { useNavigate } from 'react-router-dom';
import Heading from './Heading';

const VerifyStudent = () => {
    const [studentData, setStudentData] = useState([]);
    const [ModalVisibility, setModalVisibility] = useState(false);
    const [modalMsg, setModalMsg] = useState("");
    const {TPOdata} = useContext(TPOAuthContext);
    const navigate = useNavigate("");

    const fetchStudent = async () => {
        try {
            const response = await fetch("http://localhost:5000/fetchStudentsDetails");
            const data = await response.json();
            // console.log(data);
            // if(data.length === 0 ){
            //     setModalMsg("No Student To verify");
            //     setModalVisibility(true);
            //     return;
            // }
            if (data) {
                setStudentData(data);
            } else {
                setModalMsg("No Student To verify");
                setModalVisibility(true);
                // return;
            }
        } catch (error) {
            // Display modal to show error
            console.error('An error occurred:', error);
        }
    };

    useEffect(() => {
        if(!TPOdata){
            navigate('/TPOLogin')
        }
        else{
            fetchStudent();
        }
    }, [TPOdata]);

    if(!TPOdata){
        return(<> navigate('/TPOLogin') </>)
    }

    return (
        <div className='container'>
            <Heading heading={'Verify Students'} />
            {studentData.map((student) => (
                <StudentVerificationCard
                    key={student.studentAdmNum}
                    name={student.studentName}
                    email={student.studentOfficialEmail}
                    admNum={student.studentAdmNum}
                    contact={student.studentContact}
                    imgPath={student.profilePicture}
                    navigateLink={`/moreDetails/${student.studentAdmNum}`}
                />
            ))}
            <Modal
            visibility={ModalVisibility}
            setModalVisibility={setModalVisibility}
            modalContent={modalMsg}
            NavigationLink={"TPODashboard"}
            modalHeading={"Verification Status"}
            />
        </div>
    );
};

export default VerifyStudent;
