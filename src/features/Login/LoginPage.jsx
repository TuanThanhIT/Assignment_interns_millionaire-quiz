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
  const [onMusic, setOnMusic] = useState();
  const [onLanguage, setOnLanguage] = useState();

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
    <div className={styles.container}>
      <div>
        <h1 className={styles.title}>{t("welcomeLogin")}</h1>
        <p className={styles.message}>{t("messageLogin")}</p>
        <input
          ref={nameRef}
          className={styles.input}
          placeholder={t("placeholderLogin")}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <button
          type="button"
          className={styles.buttonStart}
          onClick={handleSubmit}
        >
          {t("login")}
        </button>

        <div className={styles.loginButtons}>
          <div className={styles.languages}>
            <button
              onClick={() => {
                i18n.changeLanguage("en");
                setOnLanguage(true);
              }}
              style={{
                background: onLanguage ? "#4caf50" : "#4f46e5",
              }}
            >
              🔤 🇺🇸 En
            </button>
            <button
              onClick={() => {
                i18n.changeLanguage("vi");
                setOnLanguage(false);
              }}
              style={{
                background: onLanguage ? "#4f46e5" : "#4caf50",
              }}
            >
              🔡 🇻🇳 Vi
            </button>
          </div>
          <div className={styles.music}>
            <button
              onClick={() => {
                playMusic();
                setOnMusic(true);
              }}
              style={{ background: onMusic ? "#4caf50" : "#4f46e5" }}
            >
              🎵 Bật nhạc
            </button>
            <button
              onClick={() => {
                pauseMusic();
                setOnMusic(false);
              }}
              style={{ background: onMusic ? "#4f46e5" : "#4caf50" }}
            >
              ⏸️ Tắt nhạc
            </button>
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
