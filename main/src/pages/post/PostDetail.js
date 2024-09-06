import React, { useState } from "react";
import "./PostDetail.css";
import CommentModal from "../../components/comment/CommentModal"; // 댓글 등록 모달 추가
import CommentEdit from "../comment/CommentEdit"; // 댓글 수정 모달 추가
import CommentDelete from "../comment/CommentDelete"; // 댓글 삭제 모달 추가

function PostDetail() {
  console.log("PostDetail 컴포넌트 렌더링");

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [currentComment, setCurrentComment] = useState(null); // 현재 수정할 댓글 저장
  const [commentToDelete, setCommentToDelete] = useState(null); // 삭제할 댓글 저장

  // 모달 열기/닫기
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const openEditModal = (comment) => {
    setCurrentComment(comment);
    setShowEditModal(true);
  };
  const closeEditModal = () => setShowEditModal(false);

  const openDeleteModal = (comment) => {
    setCommentToDelete(comment);
    setShowDeleteModal(true);
  };
  const closeDeleteModal = () => setShowDeleteModal(false);

  // 댓글 추가 함수
  const addComment = (nickname, content) => {
    const newComment = {
      id: comments.length + 1,
      name: nickname,
      date: new Date().toLocaleString(),
      content: content,
    };
    setComments([...comments, newComment]);
    closeModal();
  };

  const handleSaveComment = (updatedComment) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === updatedComment.id ? updatedComment : comment
      )
    );
    closeEditModal();
  };

  const confirmDelete = () => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentToDelete.id)
    );
    closeDeleteModal();
  };

  return (
    <div className="post-detail">
      <header className="header">
        <h1>
          <img src="logo.jpg" alt="Logo" className="logo" />
        </h1>
      </header>

      <article className="post">
        <h2 className="post-title">인천 앞바다에서 무려 60cm 월척을 낚다!</h2>
        <p className="post-meta">작성자: 인천앞바다 • 24/01/19 18:00</p>
        <img src="Rectangle 41.png" alt="Fishing" className="post-image" />
        <div className="post-body">
          <p>
            인천 앞바다에서 월척을 낚았습니다! 가족들과 기억에 오래도록 남을
            멋진 하루였어요.
          </p>
        </div>
      </article>

      <section className="comments-section">
        <button className="comment-button" onClick={openModal}>
          댓글 등록하기
        </button>
        <h3>댓글 {comments.length}</h3>

        <div className="comment-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-details">
                <p className="comment-header">
                  <strong>{comment.name}</strong> • {comment.date}
                </p>
                <p className="comment-content">{comment.content}</p>
              </div>
              <div className="comment-icons">
                <button
                  className="icon-button"
                  onClick={() => openEditModal(comment)}
                >
                  <img src="/Pen.png" alt="Edit" />
                </button>
                <button
                  className="icon-button"
                  onClick={() => openDeleteModal(comment)}
                >
                  <img src="/Trash Bin Trash.png" alt="Delete" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 댓글 등록 모달 */}
      <CommentModal
        showModal={showModal}
        closeModal={closeModal}
        addComment={addComment}
      />

      {/* 댓글 수정 모달 */}
      {currentComment && (
        <CommentEdit
          showEditModal={showEditModal}
          closeEditModal={closeEditModal}
          commentData={currentComment}
          onSave={handleSaveComment}
        />
      )}

      {/* 댓글 삭제 모달 */}
      {commentToDelete && (
        <CommentDelete
          showDeleteModal={showDeleteModal}
          closeDeleteModal={closeDeleteModal}
          confirmDelete={confirmDelete}
        />
      )}
    </div>
  );
}

export default PostDetail;
