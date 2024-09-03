import React from 'react';
import './CommentDelete.css';

function CommentDelete({ showDeleteModal, closeDeleteModal, confirmDelete }) {
    if (!showDeleteModal) return null;

    return (
        <div className="delete-modal-overlay">
            <div className="delete-modal-content">
                <h2>댓글 삭제</h2>
                <p>정말 이 댓글을 삭제하시겠습니까?</p>
                <div className="delete-modal-buttons">
                    <button className="confirm-button" onClick={confirmDelete}>삭제</button>
                    <button className="cancel-button" onClick={closeDeleteModal}>취소</button>
                </div>
            </div>
        </div>
    );
}

export default CommentDelete;

