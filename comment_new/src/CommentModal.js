import React from 'react';
import './CommentModal.css';

function CommentModal({ showModal, closeModal }) {
    console.log("CommentModal 컴포넌트 렌더링");

  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>댓글 등록</h2>
        <form>
          <label htmlFor="nickname">닉네임</label>
          <input type="text" id="nickname" placeholder="닉네임을 입력해 주세요" />

          <label htmlFor="comment">댓글</label>
          <textarea id="comment" placeholder="댓글을 입력해 주세요"></textarea>

          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" placeholder="비밀번호를 입력해 주세요" />

          <button type="submit" className="submit-button">등록하기</button>
        </form>
        <button className="close-button" onClick={closeModal}>닫기</button>
      </div>
    </div>
  );
}

export default CommentModal;