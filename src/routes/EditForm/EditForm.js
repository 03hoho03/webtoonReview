import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./EditForm.module.css";
import { doc, updateDoc } from "firebase/firestore";
import { dbService } from "../../fbase";

const EditForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
  const [title, setTitle] = useState(location.state.title);
  const [text, setContext] = useState(location.state.text);

  const handleChange = (e) => {
    console.log(e.target.name);
    if (e.target.name === "title") {
      setTitle(e.target.value);
      e.target.style.height = "";
      e.target.style.height = `${e.target.scrollHeight}px`;
      return;
    } else if (e.target.name === "context") {
      setContext(e.target.value);
      e.target.style.height = "";
      e.target.style.height = `${e.target.scrollHeight}px`;
      return;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const contextRef = doc(dbService, "contexts", `${location.state.id}`);
    await updateDoc(contextRef, {
      title: title,
      context: text,
    });
    navigate("/");
  };
  return (
    <div>
      <form onSubmit={onSubmit} className={styles.edit_form}>
        <textarea
          name="title"
          className={styles.title}
          placeholder="제목을 입력하세요"
          onChange={handleChange}
          value={title}
          wrap="on"
        ></textarea>
        <textarea
          name="context"
          className={styles.context}
          placeholder="내용을 입력하세요"
          onChange={handleChange}
          value={text}
        />
        <div>
          <button type="submit" name="edit">
            수정하기
          </button>
          <button>취소하기</button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
