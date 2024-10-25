import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import 'lib-flexible/flexible'
import App from "./App.jsx";
import './index.css'
import "zarm/dist/zarm.min.css"; // 引入 Zarm 的样式
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
