import React, { useState } from "react";
import { useGetReviewsQuery, useAddRevQuery } from "./ReviewsSlice";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Reviews() {
  const { classId } = useParams();
  //console.log(classId);
  //const [selectedClass, setSelectedClass] = useState();
  const { data, isLoading } = useGetReviewsQuery(classId);
  const [form, setForm] = useState({ score: 0, comment: "" });
  console.log(data);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const response = await axios.put(
        `http://localhost:3032/classes/${classId}/reviews`,
        {
          score: form.score,
          comment: form.comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const change = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      {isLoading && <li>Loading reviews...</li>}
      {data?.map((review) => (
        <div
          key={review.id}
          style={{
            border: "1px solid #ccc",
            padding: "16px",
            marginBottom: "10px",
            borderRadius: "8px",
            backgroundColor: "black",
          }}
        >
          {/* <h2>{review.classType}</h2> */}
          <p>Username: {review.user.userName}</p>
          <p>Score: "{review.score}"</p>
          <p>Comment: "{review.comment}"</p>
        </div>
      ))}
      <form onSubmit={submit}>
        <div className="form-group">
          <label>Score</label>
          <input
            type="score"
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
            type="comment"
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
  );
}
