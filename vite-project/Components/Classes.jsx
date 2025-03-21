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
  const [accountData, setAccountData] = useState([]);
  const navigate = useNavigate();

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
      console.log("Successfully Enrolled:", res.data);
      fetchUserData();
    } catch (error) {
      console.error(
        "Error enrolling in class:",
        error.response?.data || error.message
      );
    }
  };

  const fetchUserData = async () => {
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
    fetchUserData();
  }, []);

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
  //   const refresh = () => {
  //     fetchDataClass();
  // }

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
      <div>
      {isLoggedIn && (
        <>
        <h2>Enrolled classes</h2>
        {Array.isArray(accountData.classes) &&
        accountData.classes.length > 0 ? (
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
            <p>
              *To unenroll, please go to your{" "}
              <Link to="/account" style={{ color: "blue" }}>
                account
              </Link>{" "}
              page.
            </p>
          </ul>
        ) : (
          <p>No enrolled classes</p>
        )}
        </>
        )}
        
        {/* <p>*To unenroll, please go to your {<button onClick={() => Navigate(<Account />)></button>}</p> */}
      </div>
      {/* {isLoggedIn ? <MyClasses /> : null} */}
    </div>
    
  );
}
