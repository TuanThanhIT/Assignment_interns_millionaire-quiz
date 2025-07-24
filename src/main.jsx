import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import "./languages/i18n.jsx";
import AuthProvider from "./contexts/AuthContext.jsx";
import MusicProvider from "./contexts/MusicContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <MusicProvider>
        <Router>
          <App />
        </Router>
      </MusicProvider>
    </AuthProvider>
  </StrictMode>
);
