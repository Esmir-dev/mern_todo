import { React, useEffect, useState } from "react";
import axios from "axios";
import "./Modal.css";
import { Statuses } from "./Statuses";

const Modal = ({ isOpenModal, handleClose, refreshData }) => {
  const [name, setName] = useState();
  const [status, setStatus] = useState();
  const [userID, setUserID] = useState({});
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState({});

  useEffect(async () => {
    const resp = await axios.get("http://localhost:5000/api/users");
    if (!resp.errors) {
      setUsers(resp.data);
    }
    const res = await axios.get("http://localhost:5000/api/categories");
    if (!res.errors) {
      setCategories(res.data);
    }
  }, []);

  const handleOnSave = async () => {
    const data = {
      name: name,
      status: status,
      userID: userID,
      categoryID: null
    }
    const token = sessionStorage.getItem("data");
    await axios.post("http://localhost:5000/api/tasks", data,{ headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {
          if (!res.errors) {
            handleClose();
            refreshData();
          }
        });
  }

  return (
    isOpenModal && (
      <div className="modal">
        <div className="modal-content">
          <div className="title">
            <div>Add New Task</div>
            <div className="modal-close" onClick={() => handleClose()}>
              X
            </div>
          </div>
          <div className="signup-form">
            <div>ADD NEW TASK</div>
            <form>
              <div>
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="enter task name"
                />
              </div>
              <div>
                <select onChange={(e) => setStatus(e.target.value)}>
                  <option value="none" selected disabled hidden>Select Status</option>
                  {Statuses &&
                    Statuses.length > 0 &&
                    Statuses.map((status) => {
                      return (
                        <option value={status.id}> {status.name}</option>
                      );
                    })}
                </select>
              </div>
              <div>
                <select onChange={(e) => setUserID(e.target.value)}>
                  <option value="none" selected disabled hidden>Select User</option>
                  {users &&
                    users.length > 0 &&
                    users.map((user) => {
                      return <option value={user._id}> {user.email}</option>;
                    })}
                </select>
              </div>
              <div>
                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                  <option value="none" selected disabled hidden>Select Category</option>
                  {categories &&
                    categories.length > 0 &&
                    categories.map((category) => {
                      return (
                        <option value={category._id}>
                          {category.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </form>
            <button className="btn-signup" onClick={() => handleOnSave()}>SAVE</button>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
