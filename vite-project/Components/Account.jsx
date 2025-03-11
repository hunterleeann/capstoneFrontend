import React, { useEffect, useState } from "react";
import axios from "axios";
import Reviews from "./Reviews";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";

export default function Account() {
  const [accountData, setAccountData] = useState(null);
  const navigate = useNavigate();
  const [userReviews, setUserReviews] = useState();

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
                </li>
              ))}
            </ul>
          ) : (
            <p>No enrolled classes</p>
          )}
        </>
      ) : (
        <p>Please login</p>
      )}

      <h3>My Reviews</h3>

      {Array.isArray(userReviews) && userReviews.length > 0 ? (
        <ul>
          {userReviews.map((rev) => (
            <li key={rev.id} style={{ margin: 10, border: "1px solid #ccc" }}>
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
