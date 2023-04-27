import React from "react";
import ReactModal from "react-modal";
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
import "./dialog.css";

const Dialog = ({question, actions, editMode, setEditMode}) => {

  return <ReactModal
    isOpen={editMode}
    ariaHideApp={false}
    className="dialog-container"
  >
    {question}
    <CloseButton onClick={() => setEditMode(false)} />
    <div className="dialog-actions-container">
      {actions ? actions.map(action => {
        return <Button key={action.title} onClick={() => {
          setEditMode(false);
          action?.onClick();
          }} >
          {action.title}
        </Button>;
      }) : (
      <Button onClick={() => setEditMode(false)} >
        Got it
      </Button>)}
    </div>
  </ReactModal>;
}

export default Dialog;