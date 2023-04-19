import React, { useState } from "react";
import styles from "./Comment.module.css";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { dbService } from "../../fbase";

const Comment = ({ v, contextId, userObj }) => {
  const [onUpdateBtn, setOnUpdateBtn] = useState(false);
  const [newComment, setNewComment] = useState(v.comment);

  const changeStamp = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  };
  const onClickDeleteBtn = async () => {
    let ok = window.confirm("정말 댓글을 삭제하시겠습니까 ?");
    if (ok) {
      const contextRef = doc(dbService, "contexts", `${contextId}`);
      const commentRef = doc(contextRef, "comments", `${v.id}`);
      await deleteDoc(commentRef);
      setOnUpdateBtn(false);
    }
  };

  const onClickUpdateBtn = () => {
    setOnUpdateBtn(true);
  };

  const onClickCancelBtn = () => {
    setOnUpdateBtn(false);
  };
  const onClickEditBtn = async () => {
    const contextRef = doc(dbService, "contexts", `${contextId}`);
    const commentRef = doc(contextRef, "comments", `${v.id}`);
    await updateDoc(commentRef, {
      comment: newComment,
    });
    setOnUpdateBtn(false);
  };
  const onChangeNewComment = (e) => {
    setNewComment(e.target.value);
  };
  return (
    <section className={styles.comment}>
      <div className={styles.header}>
        <div className={styles.profile}>
          <img src={v.creatorPhoto} />
          <div className={styles.class_info}>
            <div className={styles.comment_creator}>{v.creatorName}</div>
            <div className={styles.comment_createdAt}>
              {changeStamp(v.createdAt)}
            </div>
          </div>
        </div>
        {userObj ? (
          userObj.uid === v.creatorId ? (
            <div className={styles.comment_update_btns}>
              {onUpdateBtn ? (
                <></>
              ) : (
                <span className={styles.modify} onClick={onClickUpdateBtn}>
                  수정
                </span>
              )}
              <span onClick={onClickDeleteBtn}>삭제</span>
            </div>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </div>
      {onUpdateBtn ? (
        <textarea
          className={styles.edit_input}
          value={newComment}
          onChange={onChangeNewComment}
        ></textarea>
      ) : (
        <p>{v.comment}</p>
      )}
      {onUpdateBtn ? (
        <div className={styles.update_submit_btns}>
          <button className={styles.cancel_btn} onClick={onClickCancelBtn}>
            취소
          </button>
          <button className={styles.edit_btn} onClick={onClickEditBtn}>
            댓글 수정
          </button>
        </div>
      ) : (
        <></>
      )}
    </section>
  );
};

export default Comment;
