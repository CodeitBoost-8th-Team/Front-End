import React from 'react';
import './CommentDelete.css';

function CommentDelete({ showDeleteModal, closeDeleteModal, confirmDelete, commentId }) {
    if (!showDeleteModal) return null;

    const handleDelete = async () => {
        try {
            const response = await fetch(`https://api.example.com/comments/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password: '입력한 비밀번호' }), // 비밀번호는 실제로 사용자가 입력한 값을 사용해야 함
            });

            const data = await response.json();

            if (response.ok) {
                confirmDelete(); // 삭제 성공 시 부모 컴포넌트에서 댓글 상태 업데이트
                closeDeleteModal(); // 모달 닫기
                alert(data.message); // "댓글 삭제 성공" 메시지 출력
            } else {
                alert(data.message); // 오류 메시지 출력
            }
        } catch (error) {
            console.error('Error:', error);
            alert('서버와 통신 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="delete-modal-overlay">
            <div className="delete-modal-content">
                <h2>댓글 삭제</h2>
                <p>정말 이 댓글을 삭제하시겠습니까?</p>
                <div className="delete-modal-buttons">
                    <button className="confirm-button" onClick={handleDelete}>삭제</button>
                    <button className="cancel-button" onClick={closeDeleteModal}>취소</button>
                </div>
            </div>
        </div>
    );
}

export default CommentDelete;


