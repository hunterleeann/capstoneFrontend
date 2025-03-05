import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useGetUserQuery } from "./RegisterSlice";

export default function Login() {
  const { id } = useParams();
  // const { data, isSuccess } = useGetUserQuery(id);
  //const [updateUser] = useUpdateUserMutation();
  //const [email, setEmail] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // const getUser = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `http://localhost:3000/auth/login/${id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     console.log(data);

  const change = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3032/auth/login`, {
        email: form.email,
        password: form.password,
      });
      console.log(response.data);
      //localStorage.setItem("token", response.data.token); 
      const token = response.data; 
      localStorage.setItem("token", token);
      //console.log(data)
      // localStorage.setItem("user", JSON.stringify(data.user));
      //await fetchUserDetails(data.token);
      //setUser(data.user);

      console.log("Login Response:", response.data);

      // if (!data.token) {
      //   throw new Error("Missing token in login response.");
      // }

      // await fetchUserDetails(data.token);

      //navigate("/account");
    } catch (error) {
      console.error("Login Error:", error);
    }
  };
  // const submit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // const { data } = await axios.put(
  //   `http://localhost:3000/api/user/${id}`,
  //   {
  //     email,
  //   },
  //   {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //   }
  // );
  // console.log(data);
  // const response = await fetch(`http://localhost:3000/api/user/${id}`, {
  //   method: "Put",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${localStorage.getItem("token")}`,
  //   },
  //   body: JSON.stringify({
  //     email,
  //   }),
  // });
  // const data = await response.json();
  // console.log(data);
  // const response = await updateUser({ id, email }).unwrap();
  //   console.log(response);
  //   navigate("/users");
  // } catch (error) {
  //   console.error(error);
  // }
  // };

  return (
    <div>
      <form onSubmit={submit}>
        <div className="form-group">
          <label>Email address</label>
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
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
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
