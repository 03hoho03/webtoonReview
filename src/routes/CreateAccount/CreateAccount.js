import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authService } from "../../fbase";
import { useNavigate } from "react-router-dom";
import styles from "./CreateAccount.module.css";

const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
      return;
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    let data;
    try {
      data = await createUserWithEmailAndPassword(authService, email, password);
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          setError("유효하지 않은 이메일 형식입니다.");
          break;
        case "auth/email-already-in-use":
          setError("이미 존재하는 이메일입니다.");
          break;
        case "auth/weak-password":
          setError("비밀번호는 최소 6자리 입니다.");
          break;
        default:
          setError(error.code);
      }
    }
    if (data) {
      setEmail("");
      setPassword("");
      navigate("/login");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit} className={styles.input_form}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={onChange}
          className={styles.input}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
          className={styles.input}
        />
        {error && <div className={styles.error_div}>{error}</div>}
        <input
          type="submit"
          value="Make New Account"
          className={styles.submit_btn}
        />
      </form>
    </div>
  );
};

export default CreateAccount;
