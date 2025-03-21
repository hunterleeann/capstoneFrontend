import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LeaveARev from "./LeaveARev";

export default function SingleClassRev({ isLoggedIn }) {
  const { classId } = useParams();
  const navigate = useNavigate();
  const [classRev, setClassRev] = useState();

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
      console.log("Fetched reviews:", response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };
  useEffect(() => {
    fetchReviews();
  }, [classId]);
  console.log("please", classRev);

  const refreshReviews = () => {
    fetchReviews();
  };
  return (
    <div>
      <button onClick={() => navigate(`/reviews`)}>Back</button>
      {/* <p>{classRev.class.classType}</p> */}
      {isLoggedIn ? <LeaveARev refreshReviews={refreshReviews} /> : null}
      {Array.isArray(classRev) && classRev.length > 0 ? (
        <ul className="allRevs">
          {classRev.map((rev) => (
            <li className="revDisplay" key={rev.id}>
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
