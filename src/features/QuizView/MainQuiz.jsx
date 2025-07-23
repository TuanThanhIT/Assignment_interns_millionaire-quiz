import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  MessageCircleReply,
  Divide,
  Phone,
  Users,
  CircleQuestionMark,
} from "lucide-react";
import styles from "./QuizCSS/MainQuiz.module.css";
import MillionaireQuestions from "../../datas/millionaireQuestions";
import AlertDialog from "../../components/Dialog/AlertDialog";
import NoticeToast from "../../components/Toast/NoticeToast";
import UseAuth from "../../contexts/UseAuth";
import ErrorToast from "../../components/Toast/ErrorToast";
import HelpToast from "../../components/Toast/HelpToast";
import BarChartComponent from "../../components/Charts/BarChartComponent";
import { useTranslation } from "react-i18next";

function MainQuiz() {
  const millionaireQuestions = MillionaireQuestions.slice();

  // Lưu số câu người dùng trả lời
  let indexQuestion = useRef(0);

  // Lấy bộ câu hỏi
  let indexQuestionSet = useRef(
    Math.floor(Math.random() * millionaireQuestions.length)
  );

  const [question, setQuestion] = useState(
    millionaireQuestions[indexQuestionSet.current][0]
  );

  // Ghi lại lựa chọn của người dùng
  const [selected, setSelected] = useState();

  // Kiểm tra đáp án
  const [checkAnswer, setCheckAnswer] = useState(null);

  // Show thông báo
  const [showDialog, setShowDialog] = useState(false);
  const [showNoticeToast, setShowNoticeToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const navigate = useNavigate();
  let flag = useRef(false);

  // Khóa lại ko cho chọn sau khi chọn đáp án rồi
  const isLocked = useRef(false);
  // Khóa lại các quyền trợ giúp
  const isLockedFifty = useRef(false);
  const isLockedCall = useRef(false);
  const isLockedAsk = useRef(false);

  // Lưu trữ các câu trả lời để set giải thưởng
  const value = UseAuth();

  // Translation
  const { t } = useTranslation();

  // thiết lập title, content cho dialog
  const titleDialog = t("titleDialog");
  const contentDialog = t("contentDialog");

  // Thiết lập title, content cho error toast
  const titleToast = t("titleToastMain");
  const contentToast = t("contentToastMain");

  // Thiết lập thời gian cho câu hỏi
  const [time, setTime] = useState(30);
  let timer = useRef();

  // Tránh gọi useEffect ngay khi mới load trang
  useEffect(() => {
    setTimeout(() => {
      flag.current = true;
    }, 1000);
  }, [flag]);

  // Hiển thị thông báo và trả về kêt quả khi trả lời sai
  useEffect(() => {
    let timeout;
    if (flag.current === true) {
      setShowNoticeToast(true);
      if (checkAnswer && checkAnswer.check === false) {
        timeout = setTimeout(() => {
          navigate("/result");
        }, 5000);
      }
    }
    return () => clearTimeout(timeout);
  }, [checkAnswer]);

  //  Hiển thị thông báo và trả về kết quả khi hết thời gian
  useEffect(() => {
    if (time > 0) {
      timer = setTimeout(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    } else {
      isLocked.current = true;
      setShowErrorToast(true);
      setTimeout(() => {
        navigate("/result");
      }, 5000); // chờ 1.5 giây để toast hiển thị
    }

    return () => clearTimeout(timer); // cleanup để tránh chạy trùng
  }, [time]);

  // Hàm trả về result nếu trả lời hết 15 câu hỏi
  function handleQuestion() {
    indexQuestion.current += 1;
    if (indexQuestion.current > 14) {
      navigate("/result");
    }
    setQuestion(
      millionaireQuestions[indexQuestionSet.current][indexQuestion.current]
    );
    setTime(30);
    isLocked.current = false;
  }

  // Hiển thị dialog
  function handleAnswer() {
    setShowDialog(true);
  }

  // Tính toán mốc tiền thưởng
  const calculatePrize = (isCorrect) => {
    if (isCorrect) {
      value.updatePrize(question.id - 1);
    } else {
      const prizeValue =
        question.id >= 1 && question.id <= 5
          ? -1
          : question.id >= 6 && question.id <= 10
          ? 4
          : 9;

      value.updatePrize(prizeValue);
    }
  };

  // Hiển thị Toast sau khi check đáp án
  function handleSubmit() {
    const isCorrect = selected === question.answer;
    const result = { id: question.id, check: isCorrect };
    calculatePrize(isCorrect);
    setCheckAnswer(result);
    value.setStorageAnswer([...value.storageAnswer, result]);
    isLocked.current = true;
    clearTimeout(timer);
  }

  // Xử lý các quyền trợ giúp
  // 50:50
  function handleFiftyFifty() {
    if (isLockedFifty.current === true) {
      return;
    } else {
      const incorrectAnswer = question.options.filter(
        (option) => option !== question.answer
      );

      const toRemove = incorrectAnswer
        .sort(() => 0.5 - Math.random())
        .slice(0, 2);

      const newOptions = question.options.map((opt) =>
        toRemove.includes(opt) ? "" : opt
      );
      setQuestion({ ...question, options: newOptions });
      isLockedFifty.current = true;
    }
  }
  // Gọi điện cho người thân
  const [showCall, setShowCall] = useState(false);
  function handleHelpCall() {
    if (isLockedCall.current === true) {
      return;
    } else {
      setShowCall(true);
      isLockedCall.current = true;
    }
  }
  // Hỏi ý kiến khán giả
  const [showCharts, setShowCharts] = useState(false);
  const [answerData, setAnswerData] = useState([]);
  console.log(close);

  function handleAskAudiences() {
    if (isLockedAsk.current === true) {
      return;
    } else {
      setShowCharts(true);
      const newAnswerData = question.options.map((option) => {
        return {
          DapAn: option,
          LuaChon: question.answer === option ? 70 : 10,
        };
      });
      setAnswerData(newAnswerData);
      isLockedAsk.current = true;
    }
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.questionTitle}>
        <h3>
          {t("questionNumber")} {question.id}
        </h3>
        <div className={styles.helpButton}>
          <button
            onClick={handleFiftyFifty}
            style={isLockedFifty.current ? { opacity: 0.6 } : {}}
          >
            <Divide color="#00BFFF" size={20} />
            <span> 50:50</span>
          </button>
          <button
            onClick={handleHelpCall}
            style={isLockedCall.current ? { opacity: 0.6 } : {}}
          >
            <Phone color="#32CD32" size={20} />
            <span> {t("help_call")}</span>
          </button>
          <button
            onClick={handleAskAudiences}
            style={isLockedAsk.current ? { opacity: 0.6 } : {}}
          >
            <Users color="#FFD700" size={20} />
            <span> {t("help_audience")}</span>
          </button>
        </div>
        <div className={styles.answerButton}>
          <button
            onClick={() => {
              if (isLocked.current === false) {
                return;
              } else {
                handleQuestion();
              }
            }}
          >
            <CircleQuestionMark color="#4ade80" size={20} />
            <span> {t("next_question")}</span>
          </button>
          <button onClick={handleAnswer}>
            <MessageCircleReply color="#4ade80" size={20} />
            <span> {t("submit_answer")}</span>
          </button>
        </div>
      </div>

      <div className={styles.questionTime}>
        <div className={styles.totalTime}>
          <div
            className={styles.timeLeft}
            style={{ width: `${(time / 30) * 100}%` }}
          ></div>
        </div>
        <div className={styles.timeDisplay}>
          <Clock />
          <span className={time <= 5 ? styles.timeDanger : styles.timeNormal}>
            {" "}
            {t("time_left")}: {time}s
          </span>
        </div>
      </div>

      <div className={styles.questionContent}>
        <div className={styles.questionText}>
          <li>{question.question}</li>
        </div>
        <div className={styles.options}>
          {question.options.map((option, index) => {
            const label = String.fromCharCode(65 + index); // 65 là 'A'
            return (
              <li
                key={index}
                onClick={() => {
                  if (isLocked.current == false) {
                    setSelected(option);
                  } else {
                    return;
                  }
                }}
                className={styles.option}
                style={{
                  color:
                    checkAnswer?.check &&
                    checkAnswer?.id === question.id &&
                    selected === option
                      ? "#00ff66"
                      : option === selected
                      ? "#f44336"
                      : "#ffeb3b",
                }}
              >
                {label}. {option}
              </li>
            );
          })}
        </div>
      </div>

      <div>
        <AlertDialog
          open={showDialog}
          setOpen={setShowDialog}
          handleSubmit={handleSubmit}
          title={titleDialog}
          content={contentDialog}
        />

        <NoticeToast
          open={showNoticeToast}
          setOpen={setShowNoticeToast}
          checkAnswer={checkAnswer && checkAnswer.check}
        />

        <ErrorToast
          open={showErrorToast}
          setOpen={setShowErrorToast}
          title={titleToast}
          content={contentToast}
        />

        <HelpToast open={showCall} setOpen={setShowCall} question={question} />

        {showCharts && (
          <div className={styles.overlay}>
            <h3>{t("audience_chart_title")}</h3>
            <BarChartComponent data={answerData} />
            <button onClick={() => setShowCharts(false)}>{t("close")}</button>
          </div>
        )}
      </div>
    </div>
  );
}
export default MainQuiz;
