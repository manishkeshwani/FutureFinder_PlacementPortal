import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from './FormInput';

const StudentSignup = () => {
  const [formInputs, setFormInputs] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const key = e.target.name;
    const val = e.target.value;
    setFormInputs(values=>({...values,[key]:val}))
  };

  const handleStudentSignup = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/studentSignup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formInputs)
      });
      const result = await response.json();
      if (result.message) {
        console.log(result.message);

      } else {
        console.log('Signup successful');
        navigate('/Studentlogin');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="row">
      <h1>Signup, To secure your future!!!</h1>
      <div className="col mt-5">
        <form onSubmit={handleStudentSignup} className='studentSignup'>
          <FormInput type={"text"} name={"name"} placeholder={''} value={formInputs.name} onChange={handleChange} required={true} label={'Name'}/>
          <FormInput type={"text"} name={"admNum"} placeholder={''} value={formInputs.admNum} onChange={handleChange} required={true} label={'Admission Number'}/>
          <FormInput type={"number"} name={"rollNo"} placeholder={''} value={formInputs.rollNo} onChange={handleChange} required={true} label={'Roll Number'}/>
          <FormInput type={"number"} name={"contact"} placeholder={''} value={formInputs.contact} onChange={handleChange} required={true} label={'Contact Number'}/>
          <FormInput type={"email"} name={"email"} placeholder={''} value={formInputs.email} onChange={handleChange} required={true} label={'College Email ID'}/>
          <FormInput type={"password"} name={"password"} placeholder={''} value={formInputs.new_password} onChange={handleChange} required={true} label={'New Password'}/>
          <FormInput type={"password"} name={"verify_password"} placeholder={''} value={formInputs.verify_password} onChange={handleChange} required={true} label={'Re-enter Password'}/>

            <button type="submit" className='signupBtn btn btn-primary mb-5'>Signup</button>
        </form>
      </div>
    </div>
  );
}

export default StudentSignup;
