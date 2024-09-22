import React, { useEffect, useState } from 'react'
import Heading from "./Heading";
import ProfileCard from "./ProfileCard";
import DashboardCard from "./DashboardCard";
import { useContext } from 'react';
import { TPOAuthContext } from './TPOAuth';
import { useNavigate } from 'react-router-dom';

const TPODashboard = () => {

  const {TPOdata} = useContext(TPOAuthContext);
  const navigate = useNavigate('');
  const [TPODetails,setTPODetails] = useState({});

  useEffect(()=>{
    if(!TPOdata){
      navigate('/TPOLogin');
    }
    else{
      fetchTPODetails();
    }
  },[TPOdata,navigate]);

  const fetchTPODetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/fetchingTPODetails/${TPOdata.adminID}`);
      const result = await response.json();
  
      if (result) {
        console.log(" data found.");
        setTPODetails(result);
      } else {
        console.log("No data found.");
        // navigate('/TPOLogin');
      }
    } catch (error) {
      console.error("Error fetching TPO details:", error);
      // navigate('/TPOLogin');
    }
  };
  

    if(!TPOdata){
      return (<>navigate('/TPOLogin')</>);
    }

  return (
    <div className='container'>
        <Heading heading={"TPO Dashboard"}/>

        <ProfileCard
          name={TPODetails.tpoName}
          email={TPODetails.tpoEmail}
          contact={TPODetails.contact}
          imgPath={"http://localhost:5000/uploads/tpoProfile/tpoDp.jpg"}
          adminID={TPODetails.adminID}
          navigateLink={"/tpoProfile"}
        />
        
      
    </div>
  )
}

export default TPODashboard
