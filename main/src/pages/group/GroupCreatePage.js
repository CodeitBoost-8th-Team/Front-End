import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GroupForm from "../../components/group/GroupForm";
import "./GroupCreatePage.css";
import logo from "../../img/logo.jpg"; // 로고 이미지 경로 설정

const GroupCreatePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const handleGroupCreationSuccess = (createdGroupId) => {
    console.log("Created Group ID:", createdGroupId); // createdGroupId 확인
    setModalMessage("그룹 만들기 성공!");
    setIsModalOpen(true);

    setTimeout(() => {
      navigate(`/groups/${createdGroupId}`); // 그룹 상세 페이지로 이동
    }, 2000); // 2초 후에 페이지 전환
  };

  const handleGroupCreationFailure = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="group-create-page">
      <img src={logo} alt="Logo" className="group-create-page-logo" />{" "}
      {/* 로고 이미지 추가 */}
      <h2>그룹 만들기</h2>
      <GroupForm
        onSuccess={handleGroupCreationSuccess}
        onFailure={handleGroupCreationFailure}
      />
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
};

export default GroupCreatePage;
