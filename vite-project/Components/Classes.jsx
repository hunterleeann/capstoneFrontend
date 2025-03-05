import React, { useState, useEffect } from "react";
import { useGetClassesQuery, useGetCustomerQuery } from "./ClassSlice";
import axios from "axios";
import PropTypes from "prop-types"; 
import Reviews from "./Reviews"; 
import { useParams, useNavigate } from "react-router-dom"; 
import { Link } from "react-router-dom";



export default function Classes({setClassRev}) {
  const { /*data: queryData,*/ isLoading } = useGetClassesQuery();
  const [classes, setClasses] = useState([]); 
  //const [classRev, setClassRev] = useState(); 
  const navigate = useNavigate(); 


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3032/classes");
        console.log("Fetched Data:", response.data);

        setClasses(response.data); // Store in state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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
    } catch (error) {
      console.error(
        "Error enrolling in class:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div>
      <h2>Classes</h2>
      {isLoading && <p>Loading classes...</p>}

      <ul>
        {classes?.map((classItem) => (
          <li key={classItem.classId}>
            <h3>{classItem.classType}</h3>
            <p>
              <strong>Time:</strong> {classItem.hour}
            </p>
            <p>
              <strong>Day:</strong> {classItem.day}
            </p>
            {/* <button */}
            {/* onClick={() =>  */}
            {/* (window.location.href = `http://localhost:3032/classes/${classItem.classType}`)  */}
            {/* }  */}

            {/* /> */}
            <button onClick={() => putClass(classItem.classId)}>Enroll</button>
            
            {/* //   {classItem.classType} */}
            {/* // </button> */} 
            <button onClick={() => /*setClassRev(classItem.classId)*/ navigate(`/classes/${classItem.classId}/reviews`)}>
              Reviews
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
Classes.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string, // Change to string if needed
  }),
};
