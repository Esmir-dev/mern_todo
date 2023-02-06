import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import todos from "../../../assets/todos.jpg";
import LoginTodo from "../../../servis/auth/login";
import Header from "../../Dashboard/Header/Header";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const submitLogin = () => {
    navigate("/dashboard");
  };
  const navigate = useNavigate();

  const onSubmitLogin = () => {
    LoginTodo(email, password).then((res) => {
      if (!res.errors) {
        sessionStorage.setItem("data", res.data.token);
        navigate("/dashboard");
      }
    });
  };

  return (
    <div>
      <Header />
      <div className="login-content">
        <div
          className="login-display"
          // style={{ backgroundImage: `url(${todos})` }}
        >
          <img src={todos} />
        </div>
        <div className="login-form">
          <div>TO DO MERN LOGIN</div>
          <form>
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
          <div className="user-action">
            <button className="btn-login" onClick={() => onSubmitLogin()}>
              login
            </button>
            <button className="btn-signup" onClick={() => navigate("/signup")}>
              signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
