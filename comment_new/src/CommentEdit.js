import React, { useState } from 'react';
import './CommentEdit.css';

function CommentEdit({ showEditModal, closeEditModal, commentData, onSave }) {
  const [nickname, setNickname] = useState(commentData.nickname);
  const [content, setContent] = useState(commentData.content);
  const [commentPassword, setCommentPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!showEditModal) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // API 요청에 보낼 수정된 댓글 데이터
    const updatedCommentData = {
      nickname,
      content,
      commentPassword,
    };

    try {
      const response = await fetch(`https://api.example.com/comments/${commentData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCommentData),
      });

      const data = await response.json();

      if (response.ok) {
        // 서버에서 수정된 댓글 데이터 응답받음
        onSave(data); // 부모 컴포넌트에서 상태 업데이트
        closeEditModal(); // 모달 닫기
      } else {
        // 에러 메시지를 상태로 설정하여 사용자에게 표시
        setErrorMessage(data.message || '댓글 수정에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('서버와 통신 중 오류가 발생했습니다.');
    }
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