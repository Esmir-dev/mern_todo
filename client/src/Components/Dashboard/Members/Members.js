import React, { useState } from "react";
import Modal from "../Modal/Modal";
import "./Members.css";

const Members = (refreshData) => {
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className="members">
      <button onClick={() => toggleModal()}> + New Task</button>
      <Modal isOpenModal={openModal} handleClose={toggleModal} refreshData={refreshData} />
    </div>
  );
};

export default Members;
