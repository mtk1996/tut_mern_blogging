import { useState } from "react";
import Master from "../Layout/Master";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // login
  const login = () => {
    axios.post("/login", { email, password }).then(({ data }) => {
      if (data.message == "email_not_found") {
        return toast.error("Email Not Found.");
      }
      if (data.message == "wrong_password") {
        return toast.error("Wrong Password");
      }
    });
  };
  return (
    <Master>
      <h5 className="text-white">Login</h5>

      <div className="form-group">
        <label htmlFor="">Enter Email</label>
        <input
          type="email"
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="">Enter Password</label>
        <input
          type="password"
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={login}>
        Login
      </button>
    </Master>
  );
};

export default Login;
