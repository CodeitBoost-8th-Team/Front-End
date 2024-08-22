import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GroupForm from '../components/GroupForm';
import './GroupCreatePage.css';

const GroupCreatePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [groupId, setGroupId] = useState(null);
  const navigate = useNavigate();

  const handleGroupCreationSuccess = (createdGroupId) => {
    setModalMessage("그룹 만들기 성공!");
    setIsModalOpen(true);
    setGroupId(createdGroupId);

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
      <h2 style={{ fontFamily: 'Pretendard', fontSize: '35px', fontWeight: 'bold', color: '#000000' }}>
        그룹 만들기
      </h2>
      <GroupForm onSuccess={handleGroupCreationSuccess} onFailure={handleGroupCreationFailure} />
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
