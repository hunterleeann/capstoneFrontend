import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

export default function LeaveARev({refreshReviews}) {
    const [form, setForm] = useState({ score: 0, comment: ""});
    const { classId } = useParams();


    const submit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
          console.log(token);
          console.log("Sending PUT request with Authorization header:");
          const response = await axios.put(
            `http://localhost:3032/classes/${classId}/reviews`,
            {
              score: form.score,
              comment: form.comment,
             // classType: form.classType,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          ); 
          refreshReviews();
          console.log(response.data);
        } catch (error) {
          console.error( error);
        }
      };
      const change = (e) => {
        const { name, value } = e.target;
    
        setForm((prev) => ({
          ...prev,
          [name]: name === "score" ? Number(value) : value,
        }));
      }; 

      

  return (
     <div>
     <h3>Leave a review!</h3>
      <form onSubmit={submit}  className="revForm">
        <div className="form-group">
          <label>Score</label>
          <input
            type="number"
            className="form-control"
            id="score"
            placeholder="Enter score"
            name="score"
            onChange={change}
          />
        </div>
        <div className="form-group">
          <label>Comment</label>
          <input
            type="text"
            className="form-control"
            id="comment"
            placeholder="Enter comment"
            name="comment"
            onChange={change}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form> 
    </div> 
  )
}
