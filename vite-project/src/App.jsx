import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { useState } from "react";
import Register from "/Components/Register";
import Nav from "/components/Nav";
import { store } from "/store/store.js";
import Home from "/Components/Home";
import Login from "/Components/Login";
import Classes from "../Components/Classes";
import Account from "../Components/Account";
import Reviews from "../Components/Reviews";
import MyReviews from "../Components/MyReviews";
import SingleClassRev from "../Components/SingleClassRev";
//import './styles.css';

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null); 
  //const [classRev, setClassRev] = useState();
  const [userReviews, setUserReviews] = useState();
  const [allReviews, setAllReviews] = useState();
  const [classRev, setClassRev] = useState();

  return (
    <>
      <Provider store={store}>
        <Router>
          <Nav />
          <div>
            <Routes>
              {/* <Route exact path="/home">
                <Home />
                <Classes />
              </Route> */}
              <Route path="/" element={<Home />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/auth/login" element={<Login setUser={setUser} />} />
              <Route
                path="/classes"
                element={<Classes classRev={classRev} />}
              />
              <Route path="/account" element={<Account />} />
              <Route
                path="/reviews"
                element={
                  <Reviews
                    setAllReviews={setAllReviews}
                    allReviews={allReviews}
                    userReviews={userReviews}
                    setClassRev={setClassRev}
                  />
                }
              />
              <Route
                path="/classes/:classId/reviews"
                element={
                  <SingleClassRev
                    setClassRev={setClassRev}
                    classRev={classRev}
                  />
                }
              />
              <Route path="/myreviews" element={<MyReviews />} />
              {/* <Route
                path="/classes/:classId/reviews/:id"
                element={<Reviews />}
              /> */}
            </Routes>
          </div>
        </Router>
      </Provider>
    </>
  );
}

export default App;
