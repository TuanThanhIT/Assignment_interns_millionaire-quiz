import { useNavigate } from "react-router-dom";
import styles from "./Result.module.css";
import UseAuth from "../../contexts/UseAuth";
import prizeLevels from "../../datas/PrizeLevels";
import { useTranslation } from "react-i18next";

function ResultPage() {
  const value = UseAuth();
  const navigate = useNavigate();
  console.log(value.prize);
  const { t } = useTranslation();

  function handleExit() {
    value.logout();
    navigate("/");
  }

  return (
    <div className="container">
      <h2 className="title">
        🏆 {t("congratulation")} {value.user}! {t("prizeReceive")}:
      </h2>
      <h1 className={styles.prize}>
        {value.prize === -1 ? 0 : prizeLevels[value.prize].amount} VNĐ
      </h1>
      <button
        className="buttonStart"
        onClick={handleExit}
        style={{ outline: "none" }}
      >
        {t("exitButton")}
      </button>
    </div>
  );
}
export default ResultPage;
