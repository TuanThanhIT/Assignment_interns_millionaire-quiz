import * as Toast from "@radix-ui/react-toast";
import styles from "./ToastCSS/ErrorToast.module.css";

export default function ErrorToast({ open, setOpen, title, content }) {
  return (
    <Toast.Provider swipeDirection="right" duration={5000}>
      <Toast.Root
        className={styles.toastError}
        open={open}
        onOpenChange={setOpen}
      >
        <Toast.Title className={styles.toastTitle}>{title}</Toast.Title>
        <Toast.Description className={styles.toastDesc}>
          {content}
        </Toast.Description>
      </Toast.Root>

      <Toast.Viewport className={styles.toastViewport} />
    </Toast.Provider>
  );
}
