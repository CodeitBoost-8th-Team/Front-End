// CommentModal.js
import React, { useState } from 'react';
import './CommentModal.css';

function CommentModal({ showModal, closeModal, addComment }) {
  console.log("CommentModal 컴포넌트 렌더링");

  // 모달 내부에서 닉네임, 댓글, 비밀번호 상태 관리
  const [nickname, setNickname] = useState('');
  const [comment, setComment] = useState('');
  const [password, setPassword] = useState('');

  if (!showModal) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // 비어 있는 값 확인
    if (!nickname.trim() || !comment.trim() || !password.trim()) {
      alert('모든 필드를 채워 주세요.');
      return;
    }

    // 부모 컴포넌트로 댓글 데이터 전달
    addComment(nickname, comment);
    
    console.log('Comment Added: ', nickname, comment); // 확인용 로그

    // 폼 초기화
    setNickname('');
    setComment('');
    setPassword('');

    // 모달 닫기
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>댓글 등록</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nickname">닉네임</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력해 주세요"
          />

          <label htmlFor="comment">댓글</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="댓글을 입력해 주세요"
          ></textarea>

          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해 주세요"
          />

          <button type="submit" className="submit-button">등록하기</button>
        </form>
        <button className="close-button" onClick={closeModal}>닫기</button>
      </div>
    </div>
  );
}

export default CommentModal;