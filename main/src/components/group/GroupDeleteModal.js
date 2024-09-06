import React, { useState } from "react";
import "./GroupDeleteModal.css";

const GroupDeleteModal = ({ onDeleteConfirm, onClose }) => {
  const [password, setPassword] = useState("");

  const handleDelete = () => {
    onDeleteConfirm(password); // 삭제 시도, 결과는 부모 컴포넌트에서 처리
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-icon" onClick={onClose}>
          &times;
        </span>
        <h3>그룹 삭제</h3>
        <p>삭제 권한 인증</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해 주세요"
        />
        <button onClick={handleDelete}>삭제하기</button>
      </div>
    </div>
  );
};

export default GroupDeleteModal;
