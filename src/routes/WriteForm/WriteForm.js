import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { dbService, storageService } from "../../fbase";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import styles from "./WriteForm.module.css";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const WriteForm = ({ userObj }) => {
  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "title") {
      e.target.style.height = "44px";
      e.target.style.height = `${e.target.scrollHeight}px`;
      console.log(e.target.style.width);
      console.log(e.target.scrollWidth);
      setTitle(e.target.value);
      return;
    }
    if (e.target.name === "context") {
      e.target.style.height = "auto";
      e.target.style.height = `${e.target.scrollHeight}px`;
      setContext(e.target.value);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    let imageURL = "";
    if (image !== "") {
      const imageRef = ref(storageService, `${userObj.uid}/${v4()}`);
      const response = await uploadString(imageRef, image, "data_url");
      imageURL = await getDownloadURL(response.ref);
    }
    console.log(imageURL);

    const docRef = await addDoc(collection(dbService, "contexts"), {
      title: title,
      context: context,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      creatorName: userObj.displayName,
      creatorPhoto: userObj.profile_photo,
      like: 0,
      imageURL: imageURL,
    });
    console.log(docRef);
    setTitle("");
    setContext("");
    navigate("/");
  };
  const onFileChange = (e) => {
    const theFile = e.target.files[0];
    if (theFile) {
      const reader = new FileReader();
      reader.onloadend = (finishedEvent) => {
        setImage(finishedEvent.currentTarget.result);
      };
      reader.readAsDataURL(theFile);
    }
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
        ></textarea>
        <div>
          <input type="file" onChange={onFileChange} />
        </div>
        <textarea
          name="context"
          className={styles.context}
          placeholder="내용을 입력하세요"
          onChange={handleChange}
          value={context}
        />
        <div>
          <button type="submit" name="edit">
            등록하기
          </button>
          <button>취소하기</button>
        </div>
      </form>
    </div>
  );
};

export default WriteForm;
