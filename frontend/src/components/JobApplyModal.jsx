import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./StudentAuth";

const JobApplyModal = (props) => {
  const { data } = useContext(AuthContext);
  const modalNavigator = useNavigate("");

  useEffect(() => {
    if (!data) {
      modalNavigator("/studentLogin");
    }
  }, [data]);
  const onclose = () => {
    props.setModalVisibility(false);
    modalNavigator(`/${props.NavigationLink}`);
  };

  const handleAppliedBtn = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:5000/updatePlacementTable",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ applied: id, admNum: data.admNum }),
        }
      );
      const result = await response.json();
      if (result) {
        props.setModalVisibility(false);
        modalNavigator(`/${props.NavigationLink}`);
      } else {
        //modal to show errror
      }
    } catch (error) {}
  };

  return (
    <div
      className={`modal ${props.visibility ? "show" : ""}`}
      style={{ display: props.visibility ? "block" : "none" }}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Job Status
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onclose}
            ></button>
          </div>
          <div className="modal-body">{props.content}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={onclose}
            >
              No
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleAppliedBtn(props.jobid)}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplyModal;
