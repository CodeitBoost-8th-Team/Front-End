import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PasswordPage.css";
import logo from "../../img/logo.jpg";

function PasswordPage() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://3.39.56.63/api/groups/${groupId}/private`,
        { password }
      );
      if (response.status === 200) {
        navigate(`/groups/${groupId}`); // 비밀번호가 맞으면 그룹 상세 페이지로 이동
      } else {
        setError("비밀번호가 틀렸습니다.");
      }
    } catch (error) {
      setError("서버와의 통신에 실패했습니다.");
    }
  };

  return (
    <div className="passwordPage">
      <div className="passwordPageLogo">
        <img src={logo} alt="로고" />
      </div>
      <form className="passwordPageModal" onSubmit={handleSubmit}>
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
            value={password}
            onChange={handlePasswordChange}
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

export default PasswordPage;
