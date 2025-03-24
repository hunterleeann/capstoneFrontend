import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

export default function EditRev({ userReviews, setUserReviews }) {
  const [form, setForm] = useState({ score: "", comment: "" });
  const [showForm, setShowForm] = useState(false);
  const [selectedRev, setSelectedRev] = useState();

  const updateRev = async (revId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `https://capstonebackend-u3uj.onrender.com/myReviews/${revId}`,
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
      console.log("edited data:", res.data); 
      setSelectedRev(null);
      window.location.href = '/myreviews';

      //   setUserReviews((prevReviews) =>
      //     prevReviews.filter((rev) => rev.id !== revId)
      //   );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const DelRev = async (revId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(
        `https://capstonebackend-u3uj.onrender.com/myReviews/${revId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Deleted data:", res.data);

      setUserReviews((prevReviews) =>
        prevReviews.filter((rev) => rev.id !== revId)
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const change = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "score" ? Number(value) : value,
    }));
  };

  //   != null

  return (
    <div>
      {Array.isArray(userReviews) && userReviews.length > 0 ? (
        <ul className="allRevs">
          {userReviews.map((rev) => (
            <li className="revDisplay" key={rev.id}>
              <p>Class: {rev.class.classType}</p>
              <p>Score: {rev.score}</p>
              <p>Comment: {rev.comment}</p>
              <button onClick={() => DelRev(rev.id)}>Delete Review</button>
              {selectedRev === rev.id ? (
                <form className="changeRev">
                  <div className="form-group">
                    <label>Score</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter score"
                      name="score"
                      value={form.score}
                      onChange={change}
                    />
                  </div>
                  <div className="form-group">
                    <label>Comment</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter comment"
                      name="comment"
                      value={form.comment}
                      onChange={change}
                    />
                  </div>
                  <button type="button" onClick={() => updateRev(rev.id)}>
                    Submit
                  </button>
                  <button type="button" onClick={() => setSelectedRev(null)}>
                    Cancel
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSelectedRev(rev.id)}
                  className="btn btn-primary"
                >
                  Edit Review
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
