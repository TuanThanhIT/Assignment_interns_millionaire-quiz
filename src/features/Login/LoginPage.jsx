import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import UseAuth from "../../contexts/UseAuth";
import styles from "./Login.module.css";
import ErrorToast from "../../components/Toast/ErrorToast";
import { MusicContext } from "../../contexts/MusicContext";

function LoginPage() {
  const value = UseAuth();

  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState("");
  const nameRef = useRef();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const titleToast = t("titleToast");
  const contentToast = t("contentToast");

  const { playMusic, pauseMusic } = useContext(MusicContext);

  function handleSubmit() {
    if (userName === "") {
      setShow(true);
    } else {
      value.login(userName);
      navigate("/quiz");
      nameRef.current.focus();
    }
  }
  return (
    <div className="container">
      <div>
        <h1 className="title">{t("welcomeLogin")}</h1>
        <p className={styles.message}>{t("messageLogin")}</p>
        <input
          ref={nameRef}
          className={styles.input}
          placeholder={t("placeholderLogin")}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        ></input>
        <button type="button" className="buttonStart" onClick={handleSubmit}>
          {t("login")}
        </button>

        <div className={styles.loginButtons}>
          <div className={styles.languages}>
            <button
              onClick={() => i18n.changeLanguage("en")}
              style={{ margin: "20px" }}
            >
              🔤 🇺🇸 En
            </button>
            <button onClick={() => i18n.changeLanguage("vi")}>🔡 🇻🇳 Vi</button>
          </div>
          <div className={styles.music}>
            <button onClick={playMusic}>🎵 Bật nhạc</button>
            <button onClick={pauseMusic}>⏸️ Tắt nhạc</button>
          </div>
        </div>
        <ErrorToast
          open={show}
          setOpen={setShow}
          title={titleToast}
          content={contentToast}
        />
      </div>
    </div>
  );
}
export default LoginPage;
