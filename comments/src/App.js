import React, { useState } from 'react';

function CommentForm() {
  const [nickname, setNickname] = useState('');
  const [comment, setComment] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에 서버로 데이터를 전송하는 로직을 추가할 수 있습니다.
    console.log({ nickname, comment, password });

    // 입력 필드 초기화
    setNickname('');
    setComment('');
    setPassword('');
  };

  return (
    <div className="comment-form">
      <h2>댓글 등록</h2>
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
        <button type="submit">등록하기</button>
      </form>
    </div>
  );
}

export default CommentForm;

