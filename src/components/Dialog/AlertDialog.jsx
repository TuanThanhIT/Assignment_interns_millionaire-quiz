import * as Dialog from "@radix-ui/react-dialog";
import styles from "./AlertDialog.module.css";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

export default function AlertDialog({
  open,
  setOpen,
  handleSubmit, // Xử lý sự kiện khi chọn Chắc chắn
  title,
  content,
}) {
  const { t } = useTranslation();
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.dialogOverlay} />
        <Dialog.Content className={styles.dialogContent}>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Description>{content}</Dialog.Description>
          <div className={styles.dialogButtons}>
            <button
              className={clsx(styles.btn, styles.cancel)}
              onClick={() => {
                setOpen(false);
              }}
            >
              {t("cancel")}
            </button>
            <button
              className={clsx(styles.btn, styles.confirm)}
              onClick={() => {
                handleSubmit();
                setOpen(false); // đóng dialog sau khi xác nhận
              }}
            >
              {t("sure")}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
