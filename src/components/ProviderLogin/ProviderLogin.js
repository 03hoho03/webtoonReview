import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { authService } from "../../fbase";
import { useNavigate } from "react-router-dom";
import styles from "./ProviderLogin.module.css";

const ProviderLogin = () => {
  const navigate = useNavigate();

  const onClickBtn = async (e) => {
    let provider;
    if (e.target.name === "google") {
      provider = new GoogleAuthProvider();
    }
    const data = await signInWithPopup(authService, provider);
    if (data) {
      navigate("/");
    }
  };
  return (
    <>
      <div>
        <button
          name="google"
          onClick={onClickBtn}
          className={styles.provider_btn}
        >
          Continue with Google
        </button>
      </div>
    </>
  );
};

export default ProviderLogin;
