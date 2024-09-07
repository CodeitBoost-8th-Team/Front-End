import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PasswordPage.css";
import logo from "../../img/logo.jpg";

function PasswordPage() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [groupPassword, setGroupPassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordChange = (event) => {
    setGroupPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://3.39.56.63/api/groups/${groupId}/private`,
        { groupPassword }
      );
      if (response.status === 200) {
        localStorage.setItem(`groupPassword_${groupId}`, groupPassword); // 비밀번호를 저장
        const groupDetails = response.data;
        // 그룹 상세 정보 함께 넘김
        navigate(`/groups/${groupId}`, {
          state: { groupDetails, groupPassword },
        });
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
            value={groupPassword}
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
