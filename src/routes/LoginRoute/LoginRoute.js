import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProviderLogin from "../../components/ProviderLogin/ProviderLogin";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authService } from "../../fbase";
import styles from "./LoginRoute.module.css";

const LoginRoute = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
      console.log(e.target.name);
      return;
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
      console.log(e.target.name);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    let data;
    try {
      data = await signInWithEmailAndPassword(authService, email, password);
    } catch (error) {
      setError(error.message);
    }
    if (data) {
      navigate("/");
    }
  };
  const onClickMakeAccount = () => {
    navigate("/login/admit");
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
        <input type="submit" value="Log in" className={styles.submit_btn} />
      </form>
      {error && <div>{error}</div>}
      <span onClick={onClickMakeAccount} className={styles.make_account}>
        아직 계정이 없으십니까 ?
      </span>
      {/* <Link to="/login/admit">아직 계정이 없으십니까 ?</Link> */}
      <ProviderLogin />
    </div>
  );
};

export default LoginRoute;
