import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import StudentAuth from './components/StudentAuth.jsx'
import TPOAuth from './components/TPOAuth.jsx'

ReactDOM.createRoot(document.getElementById("root")).render(
  <TPOAuth>
    <StudentAuth>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </StudentAuth>
  </TPOAuth>
);
