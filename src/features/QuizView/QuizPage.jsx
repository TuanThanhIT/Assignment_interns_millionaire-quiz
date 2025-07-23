import styles from "./QuizCSS/Quiz.module.css";
import HeaderQuiz from "./HeaderQuiz";
import SidebarPrize from "./SidebarPrize";
import MainQuiz from "./MainQuiz";
function QuizPage() {
  return (
    <div className={styles.container}>
      <HeaderQuiz />
      <div className={styles.container2}>
        <SidebarPrize />
        <MainQuiz />
      </div>
    </div>
  );
}
export default QuizPage;
