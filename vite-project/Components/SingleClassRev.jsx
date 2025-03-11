import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import LeaveARev from "./LeaveARev";


export default function SingleClassRev() {
  const { classId } = useParams(); 
  const navigate = useNavigate(); 
  const [classRev, setClassRev] = useState();

  useEffect(() => {
    const fetchReviews = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `http://localhost:3032/classes/${classId}/reviews`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setClassRev(response.data);
        console.log("Fetched reviews:", response.data); // Check the response
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [classId]); 
  console.log("please", classRev);

  return (
    <div>
      <LeaveARev/>
      {Array.isArray(classRev) && classRev.length > 0 ? (
        <ul>
          {classRev.map((rev) => (
            <li key={rev.id} style={{ margin: 10, border: "1px solid #ccc" }}>
              {/* {console.log(rev.class.classType)} */}
              <p>Class: {rev.class.classType}</p>
              <p>Username: {rev.user.userName}</p>
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
