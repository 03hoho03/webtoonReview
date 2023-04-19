import React, { useEffect, useState } from "react";
import { dbService } from "../../fbase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import styles from "./BoardList.module.css";
import defaultImg from "./media/image1.jpg";

const BoardList = () => {
  const [Boards, setBoards] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const q = query(collection(dbService, "contexts"), orderBy("createdAt"));
    onSnapshot(q, (snapshot) => {
      const BoardsArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBoards(BoardsArr);
    });
  }, []);
  const onClickBoard = (v) => () => {
    navigate(`/board/${v.id}`, {
      state: v,
    });
  };
  const changeStamp = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  };

  return (
    <>
      {Boards &&
        Boards.map((v, i) => {
          return (
            <React.Fragment key={v.id}>
              <div className={styles.board_list}>
                <div className={styles.img_div} onClick={onClickBoard(v)}>
                  {v.imageURL !== "" ? (
                    <img src={v.imageURL} />
                  ) : (
                    <img src={defaultImg} alt="기본 이미지" />
                  )}
                </div>
                <div className={styles.info}>
                  <div className={styles.title_context_div}>
                    <h1 onClick={onClickBoard(v)}>{v.title.slice(0, 20)}</h1>
                    <p onClick={onClickBoard(v)}>{v.context.slice(0, 50)}</p>
                    <span>{changeStamp(v.createdAt)}</span>
                  </div>
                </div>
                <div className={styles.user_info_div}>
                  <div className={styles.user_info}>
                    <img src={v.creatorPhoto} />
                    <span>
                      by <b>{v.creatorName}</b>
                    </span>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
    </>
  );
};

export default BoardList;
