import React, { useState, useEffect } from "react";
import { useGetClassesQuery, useGetCustomerQuery } from "./ClassSlice";
import axios from "axios";
import PropTypes from "prop-types";
import Reviews from "./Reviews";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import MyClasses from "./MyClasses";

export default function Classes({ isLoggedIn }) {
  const { /*data: queryData,*/ isLoading } = useGetClassesQuery();
  const [classes, setClasses] = useState([]);
  //const [classRev, setClassRev] = useState();
  const navigate = useNavigate();
  
  // let newDiv = document.createElement("div");

  // useEffect(() => {
  const fetchDataClass = async () => {
    try {
      const response = await axios.get("http://localhost:3032/classes");
      console.log("Fetched Data:", response.data);

      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataClass();
  }, []);

  const putClass = async (classId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `http://localhost:3032/classes/${classId}`,
        {}, // No body needed
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // newDiv.innerHTML = "";

      // newDiv.innerHTML = "Enrolled!";
      // document.body.appendChild(newDiv);
      // fetchDataClass();
      console.log("Successfully Enrolled:", res.data);
    } catch (error) {
      console.error(
        "Error enrolling in class:",
        error.response?.data || error.message
      );
    }
  };

  // const addLike = async () => {
  //   try {
  //       const token = localStorage.getItem("token");
  //       setLikes(likes + 1);

  //     const res = await axios.patch(
  //       `http://localhost:3032/classes`, { likes: likes + 1 });
  //     console.log("Like", res.data);
  //   } catch (error) {
  //     console.error()
  //   }
  // };

  return (
    <div>
      <h2>Classes</h2>
      {isLoading && <p>Loading classes...</p>}
      <ul id="classesDisplay">
        {classes?.map((classItem) => (
          <li className="classILDisplay" key={classItem.classId}>
            <h3>{classItem.classType}</h3>
            <p>
              <strong>Time: </strong> {classItem.hour}
            </p>
            <p>
              <strong>Day:</strong> {classItem.day}
            </p>
            <p>{classItem.description}</p>
            {/* <p>Likes: {classItem.likes}</p>  */}
            {isLoggedIn ? (
              <button onClick={() => putClass(classItem.classId)}>
                Enroll
              </button>
            ) : null}
            <button
              onClick={() =>
                /*setClassRev(classItem.classId)*/ navigate(
                  `/classes/${classItem.classId}/reviews`
                )
              }
            >
              Reviews
            </button>
            {/* <button onClick={() => addLike(classItem.classType)}> Like</button> */}
          </li>
        ))}
      </ul>
      {/* <MyClasses classes={classes} /> */}
    </div>
  );
}
// Classes.propTypes = {
//   user: PropTypes.shape({
//     id: PropTypes.string, // Change to string if needed
//   }),
// };
