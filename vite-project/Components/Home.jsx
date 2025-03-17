import React from "react";
// import React, { Carousel} from "react";

import Login from "/Components/Login";
import Classes from "../Components/Classes";
import Account from "../Components/Account";
import Reviews from "../Components/Reviews";
import MyReviews from "../Components/MyReviews";
import SingleClassRev from "../Components/SingleClassRev";
import AboutMe from "./AboutMe";

export default function Home() {
  return (
    <div id="title">
      <div className="sideBar"></div>
      <div className="sideBar2"></div>

<AboutMe />
{/* <div className="bottomHalf">
  <h2>Join us!</h2>
  <h3>Classes offered at the same time every week!</h3>
      <Classes />
      </div> */}
    </div>
  );
}
