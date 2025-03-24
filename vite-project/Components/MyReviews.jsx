import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SingleClassRev from "./SingleClassRev";
import Account from "./Account";
import EditReview from "./EditReview";
import { useGetMyRevsQuery } from "./ReviewsSlice";

export default function MyReviews() {
  // const [userReviews, setUserReviews] = useState();
  const { data: userReviews, isLoading } = useGetMyRevsQuery();
  const navigate = useNavigate();

  return (
    <div>
      <h3>My Reviews</h3>
      <EditReview userReviews={userReviews}  />
    </div>
  );
}
