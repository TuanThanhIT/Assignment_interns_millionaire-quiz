import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "../features/Login/LoginPage";
import ResultPage from "../features/Result/ResultPage";
import QuizPage from "../features/QuizView/QuizPage";
import NotFoundPage from "../features/Error/NotFoundPage";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../routes/ProtectedRoute";

function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/result" element={<ResultPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      ;
    </div>
  );
}
export default AppRoutes;
