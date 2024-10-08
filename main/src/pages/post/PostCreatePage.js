import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PostForm from "../../components/post/PostForm.js";
import "./PostCreatePage.css";
import logo from "../../img/logo.jpg";

function PostCreatePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // location.state에서 groupId와 groupPassword를 추출합니다.
  const { groupId, groupPassword } = location.state || {};

  const handlePostCreationSuccess = (postId) => {
    console.log("Post ID:", postId); // postId 확인
    setModalMessage("게시글 만들기 성공!");
    setIsModalOpen(true);

    const postDetails = { postId, postPassword: groupPassword }; // test (추가한것)

    if (groupId.isPublic) {
      navigate(`/posts/${postId}`, { state: postDetails });
    } else {
      navigate(`posts/${postId}/private`, { state: postDetails });
    }
  };

  const handlePostCreationFailure = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="postCreatePageC">
      <div className="headerC">
        <div className="headerLogoC">
          <img id="logoC" src={logo} alt="로고" />
        </div>
      </div>
      <div className="containerC">
        <div className="contentHeaderC">
          <div id="contentHeaderC">추억 올리기</div>
        </div>

        <PostForm
          onSuccess={handlePostCreationSuccess}
          onFailure={handlePostCreationFailure}
          groupId={groupId}
          groupPassword={groupPassword}
        />
      </div>

      {isModalOpen && (
        <>
          <div className="modal-background"></div>
          <div className="modal">
            <h3>{modalMessage}</h3>
            <button onClick={closeModal}>확인</button>
          </div>
        </>
      )}
    </div>
  );
}

export default PostCreatePage;
