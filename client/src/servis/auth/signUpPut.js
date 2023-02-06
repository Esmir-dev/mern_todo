import axios from "axios";

const SignUpTodo = async (data) => {
  const res = await axios.post("http://localhost:5000/api/users", data);
  return res;
};

export default SignUpTodo;
