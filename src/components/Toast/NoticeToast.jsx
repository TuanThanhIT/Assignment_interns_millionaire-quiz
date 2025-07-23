import * as Toast from "@radix-ui/react-toast";
import styles from "./ToastCSS/NoticeToast.module.css";
import { CheckCircle, CircleX } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function NoticeToast({ open, setOpen, checkAnswer }) {
  const { t } = useTranslation();
  return (
    <Toast.Provider swipeDirection="right" duration={2000}>
      <Toast.Root
        className={checkAnswer ? styles.toastSuccess : styles.toastError}
        open={open}
        onOpenChange={setOpen}
      >
        <div className={styles.toastHeader}>
          {checkAnswer ? (
            <CheckCircle size={20} color="#4ade80" />
          ) : (
            <CircleX size={20} />
          )}
          <Toast.Title className={styles.toastTitle}>
            {t("titleToastMain")}
          </Toast.Title>
        </div>
        <Toast.Description className={styles.toastDesc}>
          {checkAnswer ? t("correct") : t("incorrect")}
        </Toast.Description>
      </Toast.Root>

      <Toast.Viewport className={styles.toastViewport} />
    </Toast.Provider>
  );
}
