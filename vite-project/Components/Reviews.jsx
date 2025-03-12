import React, { useEffect, useState } from "react";
import { useGetReviewsQuery, useAddRevQuery } from "./ReviewsSlice";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MyReviews from "./MyReviews";

export default function Reviews({
  setAllReviews,
  allReviews,
  setUserReviews,
  setClassRev,
}) {
  const { classId } = useParams();
  const { data, isLoading } = useGetReviewsQuery(classId);
  const [form, setForm] = useState({ score: 0, comment: "", ClassName: "" });
  console.log(data);
  const navigate = useNavigate(); 
  const [selectedClassId, setSelectedClassId] = useState();


 

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

  const handleClassChange = (event) => {
    setSelectedClassId(event.target.value);
  };

  useEffect(() => {
    const getRevs = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:3032/classes/:classId/reviews",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setClassRev(response.data);
        console.log("GetRevs", response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getRevs();
  }, []);

  useEffect(() => {
    const getClassRevs = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:3032/reviews", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setAllReviews(response.data);
        console.log("GetRevs", response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getClassRevs();
  }, []);

  console.log("testing", allReviews);
//   console.log("classRev", classRev);

  return (
    <div>

      <button
        onClick={() =>
          /*setClassRev(classItem.classId)*/ navigate(`/myreviews`)
        }
      >
        My Reviews
      </button>
<ul className="classRev">
    <li>
      <button
        onClick={() =>
          navigate(`/classes/1/reviews`)  
        }
      >
        View Yoga Reviews
      </button>
      </li>
      <li>
      <button
        onClick={() =>
          navigate(`/classes/2/reviews`)  
        }
      >
        View BootCamp Reviews
      </button>
      </li>
      <li>
      <button
        onClick={() =>
          navigate(`/classes/3/reviews`)  
        }
      >
        View Cardio Reviews
      </button>
      </li>
      <li>
      <button
        onClick={() =>
          navigate(`/classes/4/reviews`)  
        }
      >
        View Dance Reviews
      </button>
      </li>

      </ul>
      {isLoading && <li>Loading reviews...</li>}
      {data?.map((review) => (
        <div className="allReviews"
          key={review.id}
        >
          {/* <h2>{review.classType}</h2> */}
          <p>Username: {review.user.userName}</p>
          <p>Score: {review.score}</p>
          <p>Comment: "{review.comment}"</p>
        </div>
      ))}
    
      {Array.isArray(allReviews) && allReviews.length > 0 ? (
        <ul className="allRevs">
          {allReviews.map((allRev) => (
            <li className="revDisplay"
              key={allRev.id}
            
            >
              {/* {console.log(allRev.class.classType)} */}
              <p>Class: {allRev.class.classType}</p>
              {/* <p>Date: {allRev.date}</p> */}
              <p>Username: {allRev.user.userName}</p>
              <p>Score: {allRev.score}</p>
              <p>Comment: {allRev.comment}</p>

            </li>
          ))}
        </ul>
      ) : (
        <p>Please login to view your reviews.</p>
      )}
   

      {/* <h3>My Reviews</h3> */}
    </div>
  );
}
