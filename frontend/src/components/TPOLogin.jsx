import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { TPOAuthContext } from './TPOAuth';

const TPOLogin = () => {
    const [TPOmail,setTPOMail]=useState("");
    const [TPOpassword,setTPOPassword]=useState("");
    const TPONavigate = useNavigate("");
    const {saveTPOData} = useContext(TPOAuthContext);


    const handleTPOLogin=async(e)=>{
        e.preventDefault();
        const response = await fetch('http://localhost:5000/tpoLogin',{
            method:"POST",
          headers:{
            "Content-Type":"application/json",
          },
          body: JSON.stringify({
            tpoEmail:TPOmail,
            tpoPassword:TPOpassword
          })
        });
        const result = await response.json();
        if(result){
            saveTPOData(result.token,result.adminID);
            // props.setTPOuser(result);
            TPONavigate('/TPODashboard')
        }
        else{
            document.querySelector('.invalidMsg').innerText = 'Invalid Credentials!! Try Again';
        }

    }


  return (
    <div className="container">
      <div className="TPOLoginHeading">
         <h1>TPO Login</h1>
      </div>
      <div className="invalidMsg">
        <p></p>
        </div>
      <input className="form-control" type="email" placeholder="Enter email" onChange={(e)=>{setTPOMail(e.target.value)}} value={TPOmail} required/>
      <input className="form-control" type="password" placeholder="Enter password" onChange={(e)=>{setTPOPassword(e.target.value)}} value={TPOpassword} required/>

      <div className="d-flex justify-content-center align-items-center m-4">
        <button className='btn btn-primary' type="submit" onClick={handleTPOLogin}>Login</button>
      </div>
    </div>
  )
}

export default TPOLogin
