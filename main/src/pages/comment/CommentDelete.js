import React, { useState } from 'react';
import './CommentDelete.css';

function CommentDelete({ showDeleteModal, closeDeleteModal, confirmDelete, commentToDelete }) {
    const [password, setPassword] = useState('');

    if (!showDeleteModal) return null;

    const handleDelete = () => {
        // 비밀번호가 입력되지 않았을 때 경고
        if (!password) {
            alert('비밀번호를 입력해 주세요.');
            return;
        }

        // 서버와 통신하는 경우, 비밀번호를 함께 보내는 로직 추가
        // 서버에서 비밀번호를 검증한 후 삭제하는 로직이 필요합니다.
        confirmDelete(password); // 비밀번호와 함께 삭제 요청
    };

    return (
        <div className="modal-overlay">
            <div className="delete-modal-content">
                <h2>댓글 삭제</h2>
                <p>삭제 권한 인증</p>
                <input
                    type="password"
                    placeholder="비밀번호를 입력해 주세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="delete-modal-buttons">
                    <button className="confirm-button" onClick={handleDelete}>삭제</button>
                    <button className="cancel-button" onClick={closeDeleteModal}>취소</button>
                </div>
            </div>
        </div>
    );
}

export default CommentDelete;