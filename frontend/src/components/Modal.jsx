import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Modal = (props) => {
    const modalNavigator = useNavigate('')
  // const handleReload = () => {
  //   modalNavigator(`/${props.NavigationLink}`);
  //   window.location.reload();
  // };

  const onclose=()=>{
    props.setModalVisibility(false);
    modalNavigator(`/${props.NavigationLink}`);
  }

  return (
    <div className={`modal ${props.visibility ? "show" : ""}`} style={{ display: props.visibility ? "block" : "none" }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {props.modalHeading}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onclose}
            ></button>
          </div>
          <div className="modal-body">{props.modalContent}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={onclose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
