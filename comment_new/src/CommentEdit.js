import React, { useState } from 'react';
import './CommentEdit.css';

function CommentEdit({ showEditModal, closeEditModal, commentData, onSave }) {
  const [nickname, setNickname] = useState(commentData.nickname);
  const [comment, setComment] = useState(commentData.comment);
  const [password, setPassword] = useState('');

  if (!showEditModal) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에서 수정된 댓글 데이터를 처리할 로직을 추가하세요
    const updatedComment = {
      ...commentData,
      nickname,
      comment,
      password,
    };
    onSave(updatedComment);
    closeEditModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>댓글 수정</h2>
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

          <button type="submit" className="submit-button">수정하기</button>
        </form>
        <button className="close-button" onClick={closeEditModal}>닫기</button>
      </div>
    </div>
  );
}

export default CommentEdit;
