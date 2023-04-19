import React, { useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../routes/Home/Home";
import LoginRoute from "../routes/LoginRoute/LoginRoute";
import CreateAccount from "../routes/CreateAccount/CreateAccount";
import WriteForm from "../routes/WriteForm/WriteForm";
import { authService } from "../fbase";
import Board from "../routes/Board/Board.js";
import EditForm from "../routes/EditForm/EditForm";
import Profile from "../routes/Profile/Profile";

const AppRoute = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          profile_photo: user.photoURL,
        });
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Home isLoggedIn={isLoggedIn} userObj={userObj} />}
          />
          <Route path="/login" element={<LoginRoute />} />
          <Route path="/login/admit" element={<CreateAccount />} />
          <Route path="/write" element={<WriteForm userObj={userObj} />} />
          <Route path="/board/*" element={<Board userObj={userObj} />} />
          <Route path="/edit/*" element={<EditForm />} />
          <Route path="/profile/*" element={<Profile userObj={userObj} />} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRoute;
