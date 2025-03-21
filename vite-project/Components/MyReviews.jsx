import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SingleClassRev from "./SingleClassRev";
import Account from "./Account"; 
import EditReview from "./EditReview";


export default function MyReviews() {
  const [userReviews, setUserReviews] = useState();
  const navigate = useNavigate();


  // console.log("DelRev in MyReviews:", DelRev);

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

  // const userID = userReviews.id;
  // console.log(userReviews[0].id);



  // const DelRev = async (revId) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const res = await axios.delete(`http://localhost:3032/myReviews/${revId}`,{
        
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log("deleted data:", res.data);
  //     setUserReviews((prevReviews) =>
  //       prevReviews.filter((rev) => rev.id !== revId)
  //     );
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  // console.log("DelRev in MyReviews:", DelRev);
  
  return (
    <div>
      {/* <Account DelRev={DelRev}/> */}
      {/* <DeleteRev userReviews={userReviews} /> */}
      <h3>My Reviews</h3>
      {/* <DeleteRev userReviews={userReviews} setUserReviews={setUserReviews}/> */}
      <EditReview userReviews={userReviews} setUserReviews={setUserReviews}/>
{/* 
      {Array.isArray(userReviews) && userReviews.length > 0 ? (
        <ul className="allRevs">
          {userReviews.map((rev) => (
            <li className="revDisplay" key={rev.id}>
              <p>Class: {rev.class.classType}</p>
              <p>Score: {rev.score}</p>
              <p>Comment: {rev.comment}</p>
              <button onClick={() => DelRev(rev.id)}>Delete Review</button>
             
            </li>
          ))}
          
        </ul>
        
      ) : (
        <p>No reviews</p>
      )} */}
    </div>
  );
}
