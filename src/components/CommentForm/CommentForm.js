import React, { useState } from "react";
import styles from "./CommentForm.module.css";
import { addDoc, collection, doc } from "firebase/firestore";
import { dbService } from "../../fbase";

const CommentForm = ({ contextId, userObj, commentsLength }) => {
  const [comment, setComment] = useState("");

  const onChangeComment = (e) => {
    setComment(e.target.value);
  };
  const onClickCommentSubmitBtn = async () => {
    const contextRef = doc(dbService, "contexts", `${contextId}`);
    const commentRef = collection(contextRef, "comments");
    const docRef = await addDoc(commentRef, {
      comment: comment,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      creatorPhoto: userObj.profile_photo,
      creatorName: userObj.displayName,
    });
    setComment("");
  };
  return (
    <>
      <h3 className={styles.comments_length}>{`${commentsLength}개의 댓글`}</h3>
      <section className={styles.comment_form}>
        <textarea
          className={styles.comment_input}
          value={comment}
          onChange={onChangeComment}
        ></textarea>
        <button
          className={styles.comment_submitBtn}
          onClick={onClickCommentSubmitBtn}
        >
          댓글 작성
        </button>
      </section>
    </>
  );
};

export default CommentForm;
