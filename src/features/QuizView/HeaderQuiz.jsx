import { LogOut, OctagonX } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./QuizCSS/HeaderQuiz.module.css";
import UseAuth from "../../contexts/UseAuth";
import AlertDialog from "../../components/Dialog/AlertDialog";

function HeaderQuiz() {
  const { t } = useTranslation();
  const title = t("titleDialog");
  const content = t("contentStop");
  const [open, setOpen] = useState(false);
  const { user, logout } = UseAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  function handleStop() {
    setOpen(true);
  }

  function handleSubmit() {
    navigate("/result");
  }

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerLeft}>
        {/* Logo */}
        <div className={styles.logo}>
          <img alt="" src="./images/Logo.png" />
        </div>

        {/* Thông tin người chơi */}
        <div className={styles.userInfo}>
          <p>
            {t("greeting")}, {user}!
          </p>
          <hr></hr>
          <p>{t("gameInfo")}</p>
        </div>
      </div>
      <div className={styles.headerRight}>
        <button onClick={handleStop}>
          <OctagonX color="#FF4136" size={20} />
          <span> {t("Stop")}</span>
        </button>
        <button onClick={handleLogout}>
          <LogOut color="#FFA500" size={20} />
          <span> {t("Logout")}</span>
        </button>
      </div>

      <AlertDialog
        open={open}
        setOpen={setOpen}
        handleSubmit={handleSubmit}
        title={title}
        content={content}
      />
    </div>
  );
}
export default HeaderQuiz;
