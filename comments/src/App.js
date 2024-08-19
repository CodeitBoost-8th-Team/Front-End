import React, { useState } from 'react';

function CommentForm({ editingComment, onSubmit, onCancel }) {
  const [nickname, setNickname] = useState(editingComment?.nickname || '');
  const [comment, setComment] = useState(editingComment?.comment || '');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const commentData = { nickname, comment, password };

    onSubmit(commentData);
    setNickname('');
    setComment('');
    setPassword('');
  };

  return (
    <div className="comment-form">
      <h2>{editingComment ? '댓글 수정' : '댓글 등록'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>닉네임</label>
          <input
            type="text"
            placeholder="닉네임을 입력해 주세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
        </div>
        <div>
          <label>댓글</label>
          <textarea
            placeholder="댓글을 입력해 주세요"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        <div>
          <label>비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">
          {editingComment ? '수정하기' : '등록하기'}
        </button>
        {editingComment && <button onClick={onCancel}>취소</button>}
      </form>
    </div>
  );
}

export default CommentForm;
