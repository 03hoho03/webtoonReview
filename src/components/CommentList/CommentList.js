import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { dbService } from "../../fbase";
import styles from "./CommentList.module.css";
import Comment from "../Comment/Comment";
import CommentForm from "../CommentForm/CommentForm";

const CommentList = ({ contextId, userObj }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const contextRef = doc(dbService, "contexts", `${contextId}`);
    const commentRef = collection(contextRef, "comments");
    const q = query(commentRef, orderBy("createdAt"));
    onSnapshot(q, (snapshot) => {
      const commentsArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(commentsArr);
    });
  }, []);

  return (
    <>
      <CommentForm
        contextId={contextId}
        userObj={userObj}
        commentsLength={comments.length}
      />
      {comments.map((v, i) => {
        return (
          <Comment v={v} userObj={userObj} contextId={contextId} key={i} />
        );
      })}
    </>
  );
};

export default CommentList;
