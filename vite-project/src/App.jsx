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

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [classRev, setClassRev] = useState();

  return (
    <>
      <Provider store={store}>
        <Router>
          <Nav />

          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/auth/login" element={<Login setUser={setUser} />} />
              <Route
                path="/classes"
                element={<Classes setClassRev={setClassRev} />}
              />
              <Route path="/account" element={<Account />} />
              <Route path="/classes/:classId/reviews" element={<Reviews />} />
            </Routes>
          </div>
        </Router>
      </Provider>
    </>
  );
}

export default App;
