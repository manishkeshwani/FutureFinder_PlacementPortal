import React, { useContext,useEffect,useState } from 'react'
import { TPOAuthContext } from './TPOAuth';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';

const VerifyReviews = () => {

    const [review, setReview] = useState([]);
    const [modalMsg, setModalMsg] = useState("");
    const [modalVisibility, setModalVisibility] = useState(false);
    const {TPOdata} = useContext(TPOAuthContext);
    const navigate = useNavigate('');

    const fetchReview = async () => {
      // console.log(companyName.companyName);
      try {
        const response = await fetch(
          `http://localhost:5000/viewReviews`
        );
        const Reviews = await response.json();
        console.log(Reviews);
        if (Reviews) {
          setReview(Reviews);
        } else {
          //modal to show no reviews found
        }
      } catch (error) {
        //modal to show internal server error
      }
    };

    const VerifyReviews = async(id)=>{
        try {
            const response = await fetch(
              `http://localhost:5000/verifyReview/${id}`,
              {method:'PUT'}
            );
            const Reviews = await response.json();
            console.log(Reviews);
            if (Reviews) {
              setModalMsg("Review Verified");
              setModalVisibility(true);
            } else {
                setModalMsg("Review Not Verified");
                setModalVisibility(true);
            }
          } catch (error) {
            //modal to show internal server error
          }

    }

    const DeleteReviews = async(id)=>{
        try {
            const response = await fetch(
              `http://localhost:5000/deleteReview/${id}`,
              {method:'DELETE'}
            );
            const Reviews = await response.json();
            console.log(Reviews);
            if (Reviews) {
              setModalMsg("Review Delete");
              setModalVisibility(true);
            } else {
                setModalMsg("Review Not Delete");
                setModalVisibility(true);
            }
          } catch (error) {
            //modal to show internal server error
          }

    }


    useEffect(() => {
        if(!TPOdata){
            navigate('/TPOLogin')
        }
        else{
            fetchReview();
        }
    }, [TPOdata]);


    if(!TPOdata){
        return(<>navigate('/TPOLogin')</>);
    }


  return (
    <div className="container">


<div className="accordion" id="accordionUnseen">
        {review.length === 0 ? (
          <div className="h6">
          No Reviews available at the moment.
            </div>
        ) : (
            review.map((rev, idx) => (
            <div className="accordion-item" key={idx}>
              <h2 className="accordion-header" id={`headingUnseen${idx}`}>
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapseUnseen${idx}`}
                  aria-expanded="true"
                  aria-controls={`collapseUnseen${idx}`}
                >
                    <div className="row d-flex align-items-center">
                    <div className="col-auto">
                        <img
                        src="/dp.jpg"
                        alt=""
                        style={{ width: '7rem', borderRadius: '100%' }}
                        className="img-fluid"
                        />
                    </div>
                    <div className="col d-flex flex-column ">
                        <div className="" style={{ fontWeight: '700' }}>{rev.studentName}</div>
                        <div className="mt-1" style={{ fontWeight: '700' }}>{rev.admNum}</div>
                        <div className="mt-1" style={{ fontWeight: '700' }}>{rev.placed ? "Placed" : "Not Placed"}</div>
                        <div className="mt-1" style={{ fontWeight: '700' }}>{rev.studentDepartment}</div>
                    </div>
                    </div>
                </button>
              </h2>
              <div
                id={`collapseUnseen${idx}`}
                className="accordion-collapse collapse mt-3"
                aria-labelledby={`headingUnseen${idx}`}
                data-bs-parent="#accordionUnseen"
              >
                <div className="accordion-body">
                    <div className="row">
                        <div className="col">
                            <div className="h6">Company Name: {rev.companyName.toUpperCase()}</div>
                            <div className="h6">Posted On: {rev.date.slice(0, 10)}</div>
                            <div className="h6">{rev.placed?`CTC: ${rev.ctc}`:""}</div>

                            <div className="h6 mt-4">Selection Process:</div>         
                            <p>{rev.selectionProcess}</p>

                            <div className="h6 mt-4">Suggestions For Juniors:</div>                   
                            <p>{rev.suggestionsForJuniors}</p>

                            <div className="h6 mt-4">Resources For Juniors:</div>                   
                            <p>{rev.resourcesForJuniors}</p>

                            <div className="h6 mt-4">Review:</div>                   
                            <p>{rev.review}</p>

                            <div className="mt-4">
                                Manage
                                <button className="btn btn-primary m-2" onClick={()=>VerifyReviews(rev._id)}>Verify</button>
                                <button className="btn btn-primary m-2" onClick={()=>DeleteReviews(rev._id)}>Delete</button>
                            </div>                   
                        </div>
                    </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal 
                visibility={modalVisibility} 
                setModalVisibility={setModalVisibility} 
                modalHeading={"Review"} 
                modalContent={modalMsg} 
                NavigationLink={"verifyReviews"}
        />
    </div>
  )
}

export default VerifyReviews
