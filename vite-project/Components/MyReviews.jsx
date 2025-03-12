import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SingleClassRev from "./SingleClassRev";

export default function MyReviews() {
  const [userReviews, setUserReviews] = useState();
  const navigate = useNavigate();
  

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
        console.log("test1", response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getUserRev();
  }, []);
  return (
    <div>
      <h3>My Reviews</h3>

      {Array.isArray(userReviews) && userReviews.length > 0 ? (
        <ul className="allRevs">
          {userReviews.map((rev) => (
            <li className="revDisplay" key={rev.id}>
              <p>Class: {rev.class.classType}</p>
              <p>Score: {rev.score}</p>
              <p>Comment: {rev.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Please login to view your reviews.</p>
      )}
    </div>
  );
}
