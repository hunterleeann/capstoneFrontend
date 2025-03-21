import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ChangeEmail(setAccountData) {
  const [email, setEmail] = useState("");
  const [showForm, setShowForm] = useState(false);

  const updateEmail = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.patch(
        "http://localhost:3032/account",
        {
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Email:", response.data);
      //   setEmail(response.data);
      //   setAccountData(response.data);
      setShowForm(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
        {!showForm ? (
      <button onClick={() => setShowForm(true)} className="btn btn-primary">
        Change Email
      </button>
        ):(
      <form className="changeEmailForm" onSubmit={updateEmail}>
        <div className="form-group">
          <label>Email address: </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
         Submit
        </button>
      </form>
       )}
    </div>
  );
}
