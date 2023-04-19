import React from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Board.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faWrench } from "@fortawesome/free-solid-svg-icons";
import { dbService, storageService } from "../../fbase";
import { ref, deleteObject } from "firebase/storage";
import CommentForm from "../../components/CommentForm/CommentForm";
import CommentList from "../../components/CommentList/CommentList";

const Board = ({ userObj }) => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
  const context = {
    id: location.state.id,
    title: location.state.title,
    text: location.state.context,
    like: location.state.like,
    creatorId: location.state.creatorId,
    creatorName: location.state.creatorName,
    createdAt: location.state.createdAt,
    imageURL: location.state.imageURL,
  };
  const date = new Date(context.createdAt);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 4 (0부터 시작하므로 +1)
  const day = date.getDate();

  const onClickUpdateBtn = async (e) => {
    if (e.target.name === "delete_btn") {
      const shouldDelete = window.confirm("정말 삭제 하시겠습니까 ?");
      if (shouldDelete) {
        const contextRef = doc(dbService, "contexts", `${location.state.id}`);
        await deleteDoc(contextRef);
        if (context.imageURL !== "") {
          const imgRef = ref(storageService, context.imageURL);
          await deleteObject(imgRef);
        }
        navigate("/");
      } else {
        return;
      }
    } else if (e.target.name === "edit_btn") {
      navigate(`/edit/${location.state.id}`, { state: context });
    }
  };

  console.log(userObj);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{context.title}</h1>
      <div className={styles.board_detail}>
        <span className={styles.name}>
          <strong>{context.creatorName}</strong>
        </span>
        <span className={styles.date}>{`${year}년 ${month}월 ${day}일`}</span>
        {userObj && userObj.uid === context.creatorId ? (
          <div className={styles.update_btns}>
            <button name="delete_btn" onClick={onClickUpdateBtn}>
              <FontAwesomeIcon
                name="delete_btn"
                icon={faTrash}
                className={styles.icon}
              />
            </button>
            <button name="edit_btn" onClick={onClickUpdateBtn}>
              <FontAwesomeIcon
                name="edit_btn"
                icon={faWrench}
                className={styles.icon}
              />
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      {context.imageURL !== "" ? (
        <img className={styles.image} src={context.imageURL} />
      ) : (
        <></>
      )}
      <p className={styles.context}>{context.text}</p>
      <h5>좋아요 개수:{context.like}</h5>
      <CommentList contextId={context.id} userObj={userObj} />
    </div>
  );
};

export default Board;
