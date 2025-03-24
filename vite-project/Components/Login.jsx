import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useGetUserQuery } from "./RegisterSlice"; 
import Account from "./Account";
import Nav from "./Nav";


export default function Login() {
  const { id } = useParams();
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate(); 
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const change = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://capstonebackend-u3uj.onrender.com/auth/login`, {
        email: form.email,
        password: form.password,
      });
      console.log(response.data);
      const token = response.data; 
      localStorage.setItem("token", token);
      // console.log("Login Response:", response.data);
      window.location.href = '/account';
    } catch (error) {
      console.error("Login Error:", error); 
      alert("Incorrect username or password");
    }
  };

  return (
    <div>
      <form className="formClass" onSubmit={submit}>
        <div className="form-group">
          <label>Email address: </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
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
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
            onChange={change}
          />
        </div>
        <button id="submitButton" type="submit" className="btn btn-primary" >
          Submit
        </button>
      </form>
    </div>
  );
}
