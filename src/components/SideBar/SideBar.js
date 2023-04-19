import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SideBar.module.css";

const SideBar = () => {
  const navigate = useNavigate();
  const onClick = (e) => {
    if (e.target.name === "introduce") {
      console.log("clicked");
      navigate();
    }
    if (e.target.name === "summary") {
      navigate();
    }
  };
  return (
    <>
      <aside className={styles.sidebar}>
        <ul>
          <li>
            <button name="introduce" onClick={onClick}>
              웹툰 소개
            </button>
          </li>
          <li>
            <button name="summary" onClick={onClick}>
              웹툰 요약
            </button>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default SideBar;
