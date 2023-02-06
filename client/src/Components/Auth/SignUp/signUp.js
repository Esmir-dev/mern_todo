import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUpTodo from "../../../servis/auth/signUpPut";
import todos from "../../../assets/todos.jpg";

import "./signUp.css";
import Header from "../../Dashboard/Header/Header";

const SignUp = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onSubmitCreate = () => {
    const data = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      email: email,
      password: password,
    };
    SignUpTodo(data).then((res) => {
      if (!res.errors) {
        navigate("/");
      }
    });
  };
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <div className="signup-content">
        <div className="signup-display">
          <img src={todos} />
        </div>
        <div className="signup-form">
          <div>TO DO MERN LOGIN</div>
          <form>
            <div>
              <input
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="enter your firstname"
              />
            </div>
            <div>
              <input
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="enter your lastname"
              />
            </div>
            <div>
              <input
                onChange={(e) => setPhoneNumber(e.target.value)}
                type="number"
                placeholder="enter your phonenumber"
              />
            </div>
            <div>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="enter your email"
              />
            </div>
            <div>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="enter your password"
              />
            </div>
          </form>
          <button className="btn-signup" onClick={() => onSubmitCreate()}>
            signup
          </button>
          <button className="btn-back" onClick={() => navigate("/")}>
            back
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
