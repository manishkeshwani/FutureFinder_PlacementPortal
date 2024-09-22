import React, { useEffect, useState } from "react";
import Heading from "./Heading";

const ViewNotices = () => {
  const [unseenNotices, setUnseenNotices] = useState([]);
  const [seenNotices, setSeenNotices] = useState([]);
  const [error, setError] = useState(false);

  const fetchNotices = async () => {
    try {
      const response = await fetch("http://localhost:5000/viewNotices");
      const result = await response.json();
      if (result.length > 0) {
        setUnseenNotices(result.filter((notice) => !notice.hasSeen));
        setSeenNotices(result.filter((notice) => notice.hasSeen));
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleNoticeViewing = async(id)=>{
    try{
        const response = await fetch("http://localhost:5000/updateNotice",{
            method:"PUT",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({noticeID:id,hasSeen:true})
        });
        const result = await response.json();
    }catch(error){
        //modal to show error updating message
    }
  }

  return (
    <div className="container">
      <Heading heading={"Unseen Notices"} />
      <div className="accordion" id="accordionUnseen">
        {unseenNotices.length === 0 ? (
          <div className="h6">
          No unseen notices available at the moment.
            </div>
        ) : (
          unseenNotices.map((notice, idx) => (
            <div className="accordion-item" key={idx}>
              <h2 className="accordion-header" id={`headingUnseen${idx}`}>
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapseUnseen${idx}`}
                  aria-expanded="true"
                  aria-controls={`collapseUnseen${idx}`}
                  onClick={()=>handleNoticeViewing(notice.noticeID)}
                >
                  {notice.subject}
                </button>
              </h2>
              <div
                id={`collapseUnseen${idx}`}
                className="accordion-collapse collapse"
                aria-labelledby={`headingUnseen${idx}`}
                data-bs-parent="#accordionUnseen"
              >
                <div className="accordion-body">
                  <strong>Dated: {notice.date.slice(0, 10)}</strong>
                  <div className="h6">Notice:</div>
                  <p>{notice.notice}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Heading heading={"Seen Notices"} />
      <div className="accordion" id="accordionSeen">
        {seenNotices.length===0 ? (
          <div className="h6">
          No seen notices available at the moment.
            </div>
        ) : (
          seenNotices.map((notice, idx) => (
            <div className="accordion-item" key={idx}>
              <h2 className="accordion-header" id={`headingSeen${idx}`}>
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapseSeen${idx}`}
                  aria-expanded="false"
                  aria-controls={`collapseSeen${idx}`}
                >
                  {notice.subject}
                </button>
              </h2>
              <div
                id={`collapseSeen${idx}`}
                className="accordion-collapse collapse"
                aria-labelledby={`headingSeen${idx}`}
                data-bs-parent="#accordionSeen"
              >
                <div className="accordion-body">
                  <strong>Dated: {notice.date.slice(0, 10)}</strong>
                  <div className="h6">Notice:</div>
                  <p>{notice.notice}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewNotices;
