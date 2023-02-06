import axios from "axios";

const LoginTodo = async (email, password) => {
  const res = await axios.post("http://localhost:5000/auth/signin", {
    email: email,
    password: password,
  });
  return res;
};

export default LoginTodo;
