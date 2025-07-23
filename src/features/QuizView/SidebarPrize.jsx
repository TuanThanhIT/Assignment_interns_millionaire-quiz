import styles from "./QuizCSS/SidebarPrize.module.css";
import PrizeLevels from "../../datas/PrizeLevels";
import clsx from "clsx";
import UseAuth from "../../contexts/UseAuth";
import { useTranslation } from "react-i18next";
function SidebarPrize() {
  const value = UseAuth();
  const storageAnswer = value.storageAnswer;
  const { t } = useTranslation();

  return (
    <div className={styles.sidebarContainer}>
      <h3>💲 {t("prizeTitle")}</h3>
      <ul className={styles.sidebarList}>
        {PrizeLevels.slice()
          .reverse()
          .map((prize) => {
            return (
              <li
                key={prize.id}
                className={clsx(
                  styles.prize,
                  {
                    [styles.mainPrize]: prize.isMilestone,
                  },
                  {
                    [styles.achievedPrize]:
                      storageAnswer[prize.id - 1]?.check === true,
                    [styles.failPrize]:
                      storageAnswer[prize.id - 1]?.check === false,
                  }
                )}
              >
                <span className={styles.idd}>💰 {prize.id}.</span>
                <span className={styles.amount}>{prize.amount}</span>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
export default SidebarPrize;
