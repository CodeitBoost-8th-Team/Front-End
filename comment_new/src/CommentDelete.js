import React, { useState } from 'react';
import './CommentDelete.css';

function CommentDelete({ showDeleteModal, closeDeleteModal, confirmDelete, commentId }) {
    const [password, setPassword] = useState(''); // 비밀번호 상태 추가

    if (!showDeleteModal) return null;

    const handleDelete = () => {
        // 비밀번호 검증 없이 삭제 처리
        confirmDelete(commentId); // commentId를 전달하여 부모 컴포넌트에서 해당 댓글 삭제
        closeDeleteModal(); // 모달 닫기
    };

    return (
        <div className="delete-modal-overlay">
            <div className="delete-modal-content">
                <h2>댓글 삭제</h2>
                <label htmlFor="password">삭제 권한 인증</label>
                <input
                    type="password"
                    id="password"
                    placeholder="비밀번호를 입력해 주세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // 비밀번호 입력 필드
                />
                <div className="delete-modal-buttons">
                    <button className="confirm-button" onClick={handleDelete}>삭제하기</button>
                    <button className="cancel-button" onClick={closeDeleteModal}>취소</button>
                </div>
            </div>
        </div>
    );
}

export default CommentDelete;
