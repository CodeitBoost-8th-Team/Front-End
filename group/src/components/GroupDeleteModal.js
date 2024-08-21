import React from 'react';
import './GroupDeleteModal.css';  // 스타일링이 필요하다면 이 파일을 추가하세요

const DeleteModal = ({ onDeleteConfirm, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>그룹 삭제</h3>
        <p>이 그룹을 정말 삭제하시겠습니까?</p>
        <button onClick={onDeleteConfirm}>삭제</button>
        <button onClick={onClose}>취소</button>
      </div>
    </div>
  );
};

export default DeleteModal;
