import React, { useState } from 'react';
import './CommentEdit.css';

function CommentEdit({ showEditModal, closeEditModal, commentData, onSave }) {
  const [nickname, setNickname] = useState(commentData.nickname);
  const [content, setContent] = useState(commentData.content);
  const [commentPassword, setCommentPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!showEditModal) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 비밀번호가 입력되지 않았을 때 에러 처리
    if (!commentPassword.trim()) {
      setErrorMessage('비밀번호를 입력해 주세요.');
      return;
    }

    // 수정된 댓글 데이터
    const updatedComment = {
      ...commentData,
      nickname,
      content,
    };

    // 부모 컴포넌트로 수정된 데이터를 전달
    onSave(updatedComment);
    
    // 모달 닫기
    closeEditModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>댓글 수정</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="nickname">닉네임</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력해 주세요"
            required
          />

          <label htmlFor="content">댓글</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="댓글을 입력해 주세요"
            required
          ></textarea>

          <label htmlFor="commentPassword">비밀번호</label>
          <input
            type="password"
            id="commentPassword"
            value={commentPassword}
            onChange={(e) => setCommentPassword(e.target.value)}
            placeholder="비밀번호를 입력해 주세요"
            required
          />

          <button type="submit" className="submit-button">수정하기</button>
        </form>
        <button className="close-button" onClick={closeEditModal}>닫기</button>
      </div>
    </div>
  );
}

export default CommentEdit;
