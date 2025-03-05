import React, { useEffect, useState } from "react";
import axios from "axios"; 
import Reviews from "./Reviews"; 
import { Link } from "react-router-dom"; 
import { useParams, useNavigate } from "react-router-dom";



export default function Account() {
  const [accountData, setAccountData] = useState(null); 
  const navigate = useNavigate();


  useEffect(() => {
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

    fetchData();
  }, []);

  const unenroll = async (classId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(
        `http://localhost:3032/account/${classId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
        }
      
      );
      console.log(" data:", res.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Account Details</h2>
      {accountData ? (
        <>
          <p>
            <strong>Name:</strong> {accountData.userName}
          </p>
          <p>
            <strong>Email:</strong> {accountData.email}
          </p>
          <h2>Classes:</h2>
          {Array.isArray(accountData.classes) &&
          accountData.classes.length > 0 ? (
            <ul>
              {accountData.classes.map((classItem) => (
                <li key={classItem.classId}>
                  <strong>{classItem.classType}</strong> - {classItem.day} at{" "}
                  {classItem.hour}
                  <button onClick={() => unenroll(classItem.classId)}>
                    Unenroll
                  </button>
                    {/* {navigate("/Reviews")} */}
                    {/* <Link
              to={<Reviews />}
              onClick={() => {
              }}
            >test</Link> */}
                  </li>
              ))}
            </ul>
          ) : (
            <p>No enrolled classes</p>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
  
}
