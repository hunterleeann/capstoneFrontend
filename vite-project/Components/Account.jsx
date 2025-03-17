import React, { useEffect, useState } from "react";
import axios from "axios";
import Reviews from "./Reviews";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import Logout from "./Logout";
import MyClasses from "./MyClasses";
import ChangeEmail from "./ChangeEmail";

export default function Account() {
  const [accountData, setAccountData] = useState(null);
  const navigate = useNavigate();
  const [userReviews, setUserReviews] = useState(); 
  const [newEmail, setNewEmail] = useState(); 

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

  console.log(accountData);
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
      fetchData();
      console.log(" data:", res.data);
    } catch (error) {
      console.error("Error:", error); 
    }
  };
  useEffect(() => {
    const getUserRev = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:3032/account/reviews",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserReviews(response.data); 
        console.log("test", response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getUserRev();
  }, []);

  return (
    <div>
       {/* <MyClasses /> */}
      <h2>Account Details</h2>
      {accountData ? (
        <>
        
          <p>
            <strong>Username:</strong> {accountData.userName}
          </p>
          <p>
            <strong>Email:</strong> {accountData.email}
          </p> 
          {/* <ChangeEmail setNewEmail={setNewEmail}/> */}
          <Logout /> 
          <h2>Classes:</h2>
          {Array.isArray(accountData.classes) &&
          accountData.classes.length > 0 ? (
            <ul className="accountClasses">
              {accountData.classes.map((classItem) => (
                <li key={classItem.classId}>
                  <strong>{classItem.classType}</strong> - {classItem.day} at{" "}
                  {classItem.hour}
                  <button onClick={() => unenroll(classItem.classId) }>
                    Unenroll
                  </button>
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

      <h3>My Reviews</h3>

      {Array.isArray(userReviews) && userReviews.length > 0 ? (
        <ul className="allRevs">
          {userReviews.map((rev) => (
            <li className="revDisplay" key={rev.id}>
              {console.log(rev.class.classType)}
              <p>Class: {rev.class.classType}</p>
              <p>Score: {rev.score}</p>
              <p>Comment: {rev.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews</p> 
      )}
    </div>
  );
}
