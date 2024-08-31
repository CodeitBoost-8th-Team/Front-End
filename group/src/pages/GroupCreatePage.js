import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GroupForm from '../components/GroupForm';
import './GroupCreatePage.css';

const GroupCreatePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  const handleGroupCreationSuccess = (createdGroupId) => {
    console.log('Created Group ID:', createdGroupId); // createdGroupId 확인
    setModalMessage("그룹 만들기 성공!");
    setIsModalOpen(true);

    // createdGroupId가 제대로 전달되었는지 확인
    if (createdGroupId) {
      setTimeout(() => {
        navigate(`/groups/${createdGroupId}`); // 그룹 상세 페이지로 이동
      }, 2000); // 2초 후에 페이지 전환
    } else {
      console.error('생성된 그룹 ID가 유효하지 않습니다.');
      setModalMessage("그룹 생성에 실패했습니다. 유효하지 않은 ID입니다.");
    }
  };

  const handleGroupCreationFailure = (message) => {
    console.log('그룹 생성 실패 메시지:', message); // 실패 메시지 확인
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="group-create-page">
      <h2>그룹 만들기</h2>
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
