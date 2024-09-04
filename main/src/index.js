import React from "react";
import ReactDOM from "react-dom/client"; // 최신 ReactDOM 사용
import "./index.css"; // 스타일 불러오기
import App from "./App"; // 메인 App 컴포넌트 불러오기

// ReactDOM.createRoot를 사용하여 React 앱을 렌더링
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
