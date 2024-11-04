import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastMessageProvider } from "./Context/ToastMessage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastMessageProvider>
      <App />
    </ToastMessageProvider>
  </StrictMode>
);
