import React, { useContext, useEffect, useState } from "react";
import Heading from "./Heading";
import FormInput from "./FormInput";
import FormTextArea from "./FormTextArea";
import SubmitButton from "./SubmitButton";
import Modal from "./Modal";
import PastNoticeViewing from "./PastNoticeViewing";
import { TPOAuthContext } from "./TPOAuth";
import { useNavigate } from "react-router-dom";

const PostNotice = () => {
  const [noticeID, setNoticeId] = useState("");
  const [subject, setSubject] = useState("");
  const [notice, setNotice] = useState("");
  const [modalMsg, setModalMsg] = useState("");
  const [TPODetails, setTPODetails] = useState({});
  const [modalVisibility, setModalVisibility] = useState(false);
  const {TPOdata} = useContext(TPOAuthContext);
  const navigate = useNavigate('');

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
      navigate('/TPOLogin');
    }
  };


  const onclose = () => {
    setModalVisibility(false);
  };

  const noticeIdFetching = async () => {
    try {
      let id = await fetch("http://localhost:5000/IdFetcher/noticeID");
      id = await id.json();
      const ID = id.noticeID + 1;
      setNoticeId(`NID${ID}`);
      // console.log(noticeID);
    } catch (error) {}
  };

  useEffect(() => {
    if(!TPOdata){
      navigate('/TPOLogin');
    }
    else{
      noticeIdFetching();
      fetchTPODetails();
    }
  }, [TPOdata]);

  const idUpdation = async () => {
    try {
      const response = await fetch("http://localhost:5000/updateID", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ noticeID: noticeID }),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      return false;
    }
  };

  const handleNoticeSubmit = async (e) => {
    e.preventDefault();
    try {
      const isUpdated = await idUpdation();
      if (isUpdated) {
        const response = await fetch("http://localhost:5000/postNotices", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            noticeID: noticeID,
            adminID: TPODetails.adminID,
            senderName: TPODetails.tpoName,
            subject:subject,
            notice: notice,
          }),
        });
        const result = await response.json();
        if (result) {
          setModalMsg("Notice Posted");
          setModalVisibility(true);
        } else {
          setModalMsg("Error Posting Notice");
          setModalVisibility(true);
        }
      } else {
        setModalMsg("Error Posting Notice");
        setModalVisibility(true);
      }
    } catch (error) {
      setModalMsg("Internal Server Error");
      setModalVisibility(true);
    }
  };

  if(!TPOdata){
    return(<>navigate('/TPOLogin')</>)
  }

  return (
    <div className="container">
      <Heading heading={"Post Notices"} />
      <form onSubmit={handleNoticeSubmit}>
        <FormInput
          name={"noticeID"}
          label={"Notice ID"}
          type={"text"}
          placeholder={noticeID}
          isDisabled={true}
        />

        <FormInput
          name={"adminID"}
          label={"Admin ID"}
          type={"text"}
          placeholder={TPODetails.adminID}
          isDisabled={true}
        />

        <FormInput
          name={"senderName"}
          label={"Admin Name"}
          type={"text"}
          placeholder={TPODetails.tpoName}
          isDisabled={true}
        />

        <FormInput
          name={"subject"}
          label={"Subject"}
          type={"text"}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          isRequired={true}
        />

        <FormTextArea
          name={"notice"}
          label={"Notice"}
          value={notice}
          onChange={(e) => setNotice(e.target.value)}
          isRequired={true}
        />

        <SubmitButton />
      </form>

      <Modal
        visibility={modalVisibility}
        setModalVisibility={setModalVisibility}
        modalHeading={"Notice Posting Status"}
        modalContent={modalMsg}
        NavigationLink={"TPODashboard"}
      />


      <PastNoticeViewing/>


    </div>
  );
};

export default PostNotice;
