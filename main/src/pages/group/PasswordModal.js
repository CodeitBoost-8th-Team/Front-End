import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PasswordModal.css";
import logo from "../img/logo.jpg";

function PasswordModal() {
  return (
    <div className="passwordPage">
      <div className="passwordPageLogo">
        <img src={logo} alt="로고" />
      </div>
      <form className="passwordPageModal">
        <div className="passwordPageTitle">비공개 그룹</div>
        <div className="passwordPageContent">
          비공개 그룹에 접근하기 위해 권한 확인이 필요합니다.
        </div>
        <div className="passwordPageInputPassword">
          <div className="passwordPageLabel">비밀번호를 입력해 주세요</div>
          <input
            className="passwordPageInput"
            type="password"
            placeholder="비밀번호를 입력해주세요"
          />
        </div>
        <div className="passwordPagePostButton">
          <button className="passwordPagePost" type="submit">
            제출하기
          </button>
        </div>
      </form>
    </div>
  );
}

export default PasswordModal;
