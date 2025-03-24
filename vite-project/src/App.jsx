import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { useState, useEffect } from "react";
import Register from "/Components/Register";
import axios from "axios";
import Nav from "/components/Nav";
import { store } from "/store/store.js";
import Home from "/Components/Home";
import Login from "/Components/Login";
import Classes from "../Components/Classes";
import Account from "../Components/Account";
import Reviews from "../Components/Reviews";
import MyReviews from "../Components/MyReviews";
import SingleClassRev from "../Components/SingleClassRev";
import { ProtectedRoute } from "../Components/protectedRoute";
import MyClasses from "../Components/MyClasses";
import Logout from "../Components/Logout";
//import './styles.css';

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //const [classRev, setClassRev] = useState();
  const [userReviews, setUserReviews] = useState();
  const [allReviews, setAllReviews] = useState();
  const [classRev, setClassRev] = useState();
  const [accountData, setAccountData] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    setIsLoggedIn(!!storedToken);
  }, []);

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(
        "https://capstonebackend-u3uj.onrender.com/account",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Fetched user:", res.data);
      setAccountData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <div className="main">
        <Provider store={store}>
          <main>
            <Router>
              <Nav isLoggedIn={isLoggedIn} />
              <div>
                <Routes>
                  {/* <Route exact path="/home">
                <Home />
                <Classes />
              </Route> */}
                  <Route path="/home" element={<Home />} />
                  <Route path="/auth/register" element={<Register />} />
                  <Route
                    path="/auth/login"
                    element={<Login setUser={setUser} />}
                  />
                  <Route
                    path="/classes"
                    element={
                      <Classes classRev={classRev} isLoggedIn={isLoggedIn} />
                    }
                  />
                  {/* <Route path="/account" element={<protectedRoute />}> */}({" "}
                  <Route
                    path="/account"
                    element={
                      <Account
                        accountData={accountData}
                        fetchUserData={fetchUserData}
                      />
                    }
                  />{" "}
                  ){/* </Route> */}
                  <Route
                    path="/reviews"
                    element={
                      <Reviews
                        setAllReviews={setAllReviews}
                        allReviews={allReviews}
                        userReviews={userReviews}
                        setClassRev={setClassRev}
                        isLoggedIn={isLoggedIn}
                      />
                    }
                  />
                  <Route
                    path="/classes/:classId/reviews"
                    element={
                      <SingleClassRev
                        setClassRev={setClassRev}
                        classRev={classRev}
                        isLoggedIn={isLoggedIn}
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
          </main>
        </Provider>
      </div>
    </>
  );
}

export default App;
