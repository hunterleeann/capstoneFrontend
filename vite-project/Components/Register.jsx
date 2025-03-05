import React from "react";
import { useAddUserMutation } from "./RegisterSlice";
import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [registerUser] = useAddUserMutation();
  const [form, setForm] = useState({ userName: "", email: "", password: "" });
  // const navigate = useNavigate();

  const change = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3032/auth/register", {
        userName: form.userName,
        email: form.email,
        password: form.password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      console.log("Server Response:", data);

      // const response = await fetch("http://localhost:3000/api/register", {
      //     method: "Post",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       email: form.email,
      //       password: form.password,
      //     }),
      //   });
      //   const data = await response.json();
   

      // const response = await registerUser(form).unwrap();
      // console.log(response);

      // console.log(data);
      // localStorage.setItem("token", data.token);
      // navigate("/users");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="userName"
            className="form-control"
            aria-describedby="userNameHelp"
            placeholder="Enter username"
            name="userName"
            onChange={change}
          />
        </div>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            onChange={change}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            onChange={change}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
