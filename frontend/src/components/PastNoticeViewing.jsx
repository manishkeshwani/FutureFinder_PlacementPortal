import React, { useEffect, useState } from "react";
import Heading from "./Heading";

const PastNoticeViewing = () => {
    const [notices,setNotices]=useState([]);
    const [error,setError] = useState(false);
    const noticeFetching = async()=>{
        try{
            const response = await fetch('http://localhost:5000/viewNotices');
            const result = await response.json();
            setNotices(result);
        }catch{
            setNotices([]);
        }
    }

    useEffect(()=>{
        noticeFetching();
    },[])
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Heading heading={"Past Notices"} />
        </div>
      </div>

      <div className="row">
        <div className="col-12">

        <div className="accordion" id="accordionSeen">
        {notices.length===0 ? (
          <div className="h6">
          No past notices available at the moment.
            </div>
        ) : (
            notices.map((notice, idx) => (
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
      </div>
    </div>
  );
};

export default PastNoticeViewing;
