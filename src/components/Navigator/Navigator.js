import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../fbase";
import styles from "./Navigator.module.css";

const Navigator = ({ isLoggedIn, userObj }) => {
  const navigate = useNavigate();
  const onClickLogout = () => {
    authService.signOut();
  };
  const onClickWriteBtn = () => {
    navigate("/write");
  };
  const onClickProfileBtn = () => {
    navigate(`/profile/${userObj.displayName}`);
  };
  return (
    <div className={styles.container}>
      <Link to="/">
        <span className={styles.logo}>리뷰툰</span>
      </Link>
      {isLoggedIn ? (
        <div>
          <button className={styles.nav_btn} onClick={onClickWriteBtn}>
            글쓰기
          </button>
          <button className={styles.nav_btn} onClick={onClickLogout}>
            로그아웃
          </button>
          <button className={styles.nav_btn} onClick={onClickProfileBtn}>
            프로필
          </button>
        </div>
      ) : (
        <Link to="/login">
          <button className={styles.nav_btn}>Login</button>
        </Link>
      )}
    </div>
  );
};

export default Navigator;
