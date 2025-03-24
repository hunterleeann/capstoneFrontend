import React, { useEffect, useState } from "react";
import axios from "axios";
import Reviews from "./Reviews";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";

export default function MyClasses() {
  const [accountData, setAccountData] = useState([]);

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get("https://capstonebackend-u3uj.onrender.com/account", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log("Fetched user:", res.data);
      //setAccountData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
      <h2>Enrolled classes:</h2>
      {Array.isArray(accountData.classes) && accountData.classes.length > 0 ? (
        <ul className="accountClasses">
          {accountData.classes.map((classItem) => (
            <li key={classItem.classId}>
              <strong>{classItem.classType}</strong> - {classItem.day} at{" "}
              {classItem.hour}
            </li>
          ))}
        </ul>
      ) : (
        <p>No enrolled classes</p>
      )}
    </div>
  );
}
