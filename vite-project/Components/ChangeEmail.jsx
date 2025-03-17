import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ChangeEmail(setAccountData) {
    const [form, setForm] = useState({email: ""});

    const updateEmail = async () => {
        try {
            const token = localStorage.getItem("token");

          const response = await axios.patch("http://localhost:3032/account",{
            email: form.email
        },
        {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
          console.log("Data:", response.data);
          setForm(response.data);
          setAccountData(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      useEffect(() => {
        updateEmail();
      }, []);

  return (
    <div>
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
            // onSubmit={updateEmail}
          />
        </div>
        <button onClick={updateEmail}>Update email</button>
        </form>
    </div>
  )
}
