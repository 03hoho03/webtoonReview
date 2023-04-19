import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { dbService } from "../../fbase";
import { useNavigate } from "react-router-dom";

const Profile = ({ userObj }) => {
  const [userContext, setUserContext] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (userObj) {
      const q = query(
        collection(dbService, "contexts"),
        where("creatorId", "==", userObj.uid)
      );
      console.log(q);
      onSnapshot(q, (snapshot) => {
        const boardsArr = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserContext(boardsArr);
      });
    }
  }, []);
  const changeStamp = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  };
  const onClickTitle = (v) => () => {
    navigate(`/board/${v.id}`, {
      state: v,
    });
  };
  console.log(userContext);
  return (
    <>
      {userObj ? (
        <div className={styles.userProfile}>
          <img src={userObj.profile_photo} />
          <span>
            <b>{userObj.displayName}</b>
          </span>
        </div>
      ) : (
        <></>
      )}
      <div className={styles.user_context}>
        <h3>내 글</h3>
        {userContext.map((v, i) => {
          return (
            <div key={i}>
              <div onClick={onClickTitle(v)} className={styles.context_title}>
                {v.title}
              </div>
              <div className={styles.context_date}>
                {changeStamp(v.createdAt)}
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Profile;
