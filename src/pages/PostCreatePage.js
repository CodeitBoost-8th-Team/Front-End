import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import PostForm from "../components/PostForm";
import "./PostCreatePage.css";
import logo from "../img/logo.jpg";

function PostCreatePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const handlePostCreationSuccess = (PostId) => {
    setModalMessage("추억 만들기 성공!");
    setIsModalOpen(true);

    setTimeout(() => {
      navigate(`/`); // 추억 상세 페이지로 이동
    }, 2000); // 2초 후에 페이지 전환
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
        />
      </div>
    </div>
  );
}

export default PostCreatePage;
