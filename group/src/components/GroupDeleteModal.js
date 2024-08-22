import React, { useState } from 'react';
import './GroupDeleteModal.css';

const GroupDeleteModal = ({ onDeleteConfirm, onClose }) => {
  const [password, setPassword] = useState('');

  const handleDelete = () => {
    onDeleteConfirm(password);  // 입력된 비밀번호를 함께 전달
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>그룹 삭제</h3>
        <p>이 그룹을 정말 삭제하시겠습니까?</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호 입력"
        />
        <button onClick={handleDelete}>삭제</button>
        <button onClick={onClose}>취소</button>
      </div>
    </div>
  );
};

export default GroupDeleteModal;
