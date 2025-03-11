import React from "react";
import Login from "/Components/Login";
import Classes from "../Components/Classes";
import Account from "../Components/Account";
import Reviews from "../Components/Reviews";
import MyReviews from "../Components/MyReviews";
import SingleClassRev from "../Components/SingleClassRev";

export default function Home() {
  return (
    <div id="title">
      <h2>Fitness With Jill!</h2>
     <Classes />
    </div>
  );
}
