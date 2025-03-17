import React, { useEffect, useState } from "react";
import axios from "axios";
import Reviews from "./Reviews";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";

export default function MyClasses({ classes }) {
  const [accountData, setAccountData] = useState([]);

  const fetchData = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get("http://localhost:3032/account", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Fetched user:", res.data);
      setAccountData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
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
              {/* <button onClick={() => unenroll(classItem.classId)}>
                Unenroll
              </button> */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No enrolled classes</p>
      )}
      {/* <p>*To unenroll, please go to your {<button onClick={() => Navigate(<Account />)></button>}</p> */}
    </div>
  );
}
