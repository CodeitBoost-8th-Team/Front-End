import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import PostModifyModal from "../../components/post/PostModifyModal";
import PostDeleteModal from "../../components/post/PostDeleteModal";
import "./PostDetail.css";
import logo from "../../img/logo.jpg";
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

  const navigate = useNavigate();
  const location = useLocation();
  const { postId } = useParams(); // postId 파라미터 가져오기
  const [post, setPost] = useState(null); // 게시글 데이터 상태 추가
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailureModalOpen, setIsFailureModalOpen] = useState(false);
  const [failureMessage, setFailureMessage] = useState("");
  // 전달받은 postId와 postPassword
  // const { postId, postPassword } = location.state || {};

  useEffect(() => {
    // 컴포넌트가 마운트될 때 API 호출
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://3.39.56.63/api/posts/${postId}`
        );
        setPost(response.data); // 서버로부터 받은 데이터로 상태 업데이트
      } catch (error) {
        console.error("게시글 불러오기 중 오류 발생:", error);
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchPost();
  }, [postId]);

  // 게시글 수정 모달 띄움
  const handleEditClick = () => {
    setIsDeleteModalOpen(false); // 다른 모달을 닫음
    setIsEditModalOpen(true);

    navigate("/groups/{groupId}");
  };

  const handleEditSuccess = (updatedPost) => {
    setPost(updatedPost);
    setIsEditModalOpen(false);
  };

  const handleEditFailure = (message) => {
    alert(message);
  };

  // 게시글 삭제 모달 띄움
  const handleDeleteClick = () => {
    setIsEditModalOpen(false); // 다른 모달을 닫음
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async (postPassword) => {
    try {
      const response = await axios.delete(
        `http://3.39.56.63/api/posts/${postId}`,
        {
          data: { postPassword: postPassword },
        }
      );

      if (response.status === 200) {
        setIsDeleteModalOpen(false);
        setIsSuccessModalOpen(true);
        navigate("/");
      }
    } catch (error) {
      console.error("게시글 삭제 중 오류 발생:", error);

      setFailureMessage(
        error.response?.data?.message || "게시글 삭제에 실패했습니다."
      );
    }
  };

  const handleDeleteClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
    navigate("/");
  };

  const handleFailureModalClose = () => {
    setIsFailureModalOpen(false);
  };

  // 로딩 중일 때 처리
  if (loading) {
    return <div>로딩 중...</div>;
  }

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
          <img src={logo} alt="Logo" className="logo" />
        </h1>
      </header>

      <article className="post">
        <h2 className="post-title">{post.title}</h2>
        {/* post-meta와 추억 수정/삭제 버튼을 같은 줄에 배치 */}
        <div className="post-meta-actions">
          <p className="post-meta">
            작성자: {post.nickname} • {post.moment}
          </p>
          <div className="post-actions">
            <button className="edit-button" onClick={handleEditClick}>
              추억 수정하기
            </button>
            <button className="delete-button" onClick={handleDeleteClick}>
              추억 삭제하기
            </button>
            {isEditModalOpen && (
              <PostModifyModal
                postId={postId}
                initialData={post}
                onClose={() => setIsEditModalOpen(false)}
                onSuccess={handleEditSuccess}
                onFailure={handleEditFailure}
              />
            )}
            {isDeleteModalOpen && (
              <PostDeleteModal
                postId={postId}
                onDeleteConfirm={handleDeleteConfirm} // 비밀번호를 받아 삭제를 진행
                onClose={handleDeleteClose}
              />
            )}
            {isFailureModalOpen && (
              <div className="modal">
                <div className="modal-content">
                  <h3>게시글 삭제 실패</h3>
                  <p>{failureMessage}</p>
                  <button onClick={handleFailureModalClose}>확인</button>
                </div>
              </div>
            )}
          </div>
        </div>
        <img src={post.imageUrl} alt="게시글이미지" className="post-image" />
        <div className="post-body">
          <p>{post.content}</p>
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
          commentToDelete={commentToDelete}
        />
      )}
    </div>
  );
}

export default PostDetail;
// test
