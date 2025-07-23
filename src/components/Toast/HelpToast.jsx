import * as Toast from "@radix-ui/react-toast";
import styles from "./ToastCSS/HelpToast.module.css";
import { useTranslation } from "react-i18next";

export default function HelpToast({ open, setOpen, question }) {
  const { t } = useTranslation();
  return (
    <Toast.Provider swipeDirection="right" duration={5000}>
      <Toast.Root
        className={styles.toastHelp}
        open={open}
        onOpenChange={setOpen}
      >
        <Toast.Title className={styles.toastTitle}>
          {t("helpToastTitle")}
        </Toast.Title>
        <Toast.Description className={styles.toastDesc}>
          {t("helpToastDesc")}: <strong>{question.answer}</strong>
        </Toast.Description>
      </Toast.Root>

      <Toast.Viewport className={styles.toastViewport} />
    </Toast.Provider>
  );
}
