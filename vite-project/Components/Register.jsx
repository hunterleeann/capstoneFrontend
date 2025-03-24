import React from "react";
import { useAddUserMutation } from "./RegisterSlice";
import { useState } from "react";

import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({ userName: "", email: "", password: "" });

  const change = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("https://capstonebackend-u3uj.onrender.com/auth/register", {
        userName: form.userName,
        email: form.email,
        password: form.password,
      });
      const token = data; 
      localStorage.setItem("token", token);
      // console.log("register Response:", data);
      window.location.href = '/account';
      // localStorage.setItem("token", data.token);
      // localStorage.setItem("user", JSON.stringify(data.user));
      console.log("Server Response:", data);
    } catch (error) {
      console.error(error);
      alert("Username or email already taken");
    }
  };

  return (
    <div>
      <form className="formClass" onSubmit={submit}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="userName"
            className="userName"
            aria-describedby="userNameHelp"
            placeholder="Enter username"
            name="userName"
            onChange={change}
          />
        </div>
        <div className="form-group">
          <label>Email address: </label>
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
          <label>Password: </label>
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
