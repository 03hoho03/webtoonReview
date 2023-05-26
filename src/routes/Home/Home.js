import React from "react";
import Navigator from "../../components/Navigator/Navigator";
import BoardList from "../../components/BoardList/BoardList";
import styles from "./Home.module.css";
import SideBar from "../../components/SideBar/SideBar";

const Home = ({ isLoggedIn, userObj }) => {
  return (
    <div className={styles.home_container}>
      <Navigator isLoggedIn={isLoggedIn} userObj={userObj} />
      <div className={styles.container}>
        <BoardList userObj={userObj} />
        {/* <SideBar /> */}
      </div>
    </div>
  );
};

export default Home;
